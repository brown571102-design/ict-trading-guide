import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';

// 部品3：画面に寄る＋カーソル＋クリックの輪
// 中身（画面の録画や作り物の画面）を受け取り、
//   ① target に向かって寄る（ズーム）
//   ② カーソルが from から target へ動く
//   ③ clickAt のフレームで押して、輪が広がる
// focus（寄る中心）を省くと target に寄る。focus を別にすると、押す点が端にあっても
// まわりの文字（項目名など）ごと見せられる。カーソルはズームの外に置いて大きさを保つ。
export type ZoomCursorClickProps = {
  width: number;
  height: number;
  target: {x: number; y: number}; // 押す点。中身の中での位置（px）
  focus?: {x: number; y: number}; // 寄る中心。省くと target
  from?: {x: number; y: number};
  zoom?: number;
  zoomStart?: number;
  zoomEnd?: number;
  cursorStart?: number;
  clickAt?: number;
  ringColor?: string;
  children: React.ReactNode | ((clicked: boolean) => React.ReactNode);
};

const Cursor: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      d="M3 2 L3 19 L8 14.5 L11.5 22 L14.5 20.6 L11 13.2 L18 13.2 Z"
      fill="#fff"
      stroke="#111"
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
  </svg>
);

export const ZoomCursorClick: React.FC<ZoomCursorClickProps> = ({
  width,
  height,
  target,
  focus = target,
  from = {x: width * 0.8, y: height * 0.9},
  zoom = 1.8,
  zoomStart = 0,
  zoomEnd = 24,
  cursorStart = 20,
  clickAt = 50,
  ringColor = theme.accent,
  children,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scale = interpolate(frame, [zoomStart, zoomEnd], [1, zoom], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const move = interpolate(frame, [cursorStart, clickAt - 4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  // 寄ったあとの画面上で、target が見えている位置
  const tx = focus.x + (target.x - focus.x) * scale;
  const ty = focus.y + (target.y - focus.y) * scale;
  const cx = from.x + (tx - from.x) * move;
  const cy = from.y + (ty - from.y) * move;

  // 押した瞬間だけ少し縮む
  const press = interpolate(frame, [clickAt - 2, clickAt, clickAt + 4], [1, 0.82, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ring = spring({frame: frame - clickAt, fps, config: {damping: 200}, durationInFrames: 18});
  const showRing = frame >= clickAt && frame < clickAt + 20;
  const clicked = frame >= clickAt;
  const cursorVisible = frame >= cursorStart - 4;

  return (
    <div style={{position: 'relative', width, height, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${scale})`,
          transformOrigin: `${focus.x}px ${focus.y}px`,
        }}
      >
        {typeof children === 'function' ? children(clicked) : children}
      </div>
      {showRing ? (
        <div
          style={{
            position: 'absolute',
            left: tx,
            top: ty,
            width: 200,
            height: 200,
            marginLeft: -100,
            marginTop: -100,
            borderRadius: '50%',
            border: `12px solid ${ringColor}`,
            transform: `scale(${0.2 + ring * 0.9})`,
            opacity: 1 - ring,
          }}
        />
      ) : null}
      {cursorVisible ? (
        <div
          style={{
            position: 'absolute',
            left: cx - 9,
            top: cy - 6,
            transform: `scale(${press})`,
            transformOrigin: '9px 6px',
            filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.35))',
          }}
        >
          <Cursor size={110} />
        </div>
      ) : null}
    </div>
  );
};
