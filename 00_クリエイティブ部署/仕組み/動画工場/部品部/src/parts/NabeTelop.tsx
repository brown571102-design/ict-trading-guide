import React from 'react';
import {spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {theme} from '../theme';

// 部品1：ナベ型テロップ
// 鍋のかたち（上が平ら・下が丸い胴＋左右の取っ手＋上のふち）の字幕。
// 置く場所（y）は呼ぶ側が決める。顔をよける規則 TF1 は呼ぶ側で y を選んで守る。
export type NabeTelopProps = {
  text: string;
  y?: number; // 画面上端からの位置（px）
  color?: string;
  durationInFrames?: number; // 消え始めを決めるため
};

export const NabeTelop: React.FC<NabeTelopProps> = ({
  text,
  y = 1180,
  color = theme.accent,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 12, stiffness: 180}});
  const out =
    durationInFrames === undefined
      ? 1
      : interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

  const handle: React.CSSProperties = {
    position: 'absolute',
    top: 30,
    width: 60,
    height: 40,
    border: `10px solid ${color}`,
    borderRadius: 18,
    background: 'transparent',
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: y,
        display: 'flex',
        justifyContent: 'center',
        opacity: out,
        transform: `scale(${0.6 + 0.4 * pop}) translateY(${(1 - pop) * 30}px)`,
      }}
    >
      <div style={{position: 'relative', padding: '0 40px'}}>
        {/* 取っ手（左右） */}
        <div style={{...handle, left: 0}} />
        <div style={{...handle, right: 0}} />
        {/* ふち */}
        <div
          style={{
            height: 18,
            margin: '0 -8px',
            background: theme.ink,
            borderRadius: 9,
            position: 'relative',
            zIndex: 2,
          }}
        />
        {/* 胴 */}
        <div
          style={{
            background: color,
            color: theme.paper,
            fontFamily: theme.font,
            fontWeight: 900,
            fontSize: 68,
            lineHeight: 1.25,
            padding: '22px 56px 34px',
            borderRadius: '6px 6px 90px 90px',
            textAlign: 'center',
            whiteSpace: 'pre-wrap',
            boxShadow: '0 14px 0 rgba(0,0,0,0.18)',
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};
