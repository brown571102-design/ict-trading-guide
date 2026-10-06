import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';

// 部品4：ロゴの札
// 角に置く小さな札（ロゴの印＋名前）。
// ※ ロゴの規則 LG1 は未読のため、余白・大きさは仮の値。LG1 を読んだら合わせ直す。
export type LogoTagProps = {
  name: string;
  mark?: string; // 印の中の1〜2文字
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  margin?: number;
  top?: number; // 上の帯がある時など、上側の位置を明示したい時
};

export const LogoTag: React.FC<LogoTagProps> = ({
  name,
  mark = '部',
  corner = 'bottom-right',
  margin = 48,
  top,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 6, fps, config: {damping: 14}});
  const pos: React.CSSProperties = {};
  if (corner.startsWith('top')) pos.top = top ?? margin;
  else pos.bottom = margin;
  if (corner.endsWith('left')) pos.left = margin;
  else pos.right = margin;

  return (
    <div
      style={{
        position: 'absolute',
        ...pos,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '10px 26px 10px 10px',
        background: 'rgba(255,255,255,0.92)',
        borderRadius: 999,
        fontFamily: theme.font,
        boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
        opacity: enter,
        transform: `translateX(${(1 - enter) * (corner.endsWith('left') ? -40 : 40)}px)`,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: theme.accent,
          color: theme.paper,
          fontWeight: 900,
          fontSize: 34,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {mark}
      </div>
      <span style={{color: theme.ink, fontWeight: 900, fontSize: 34}}>{name}</span>
    </div>
  );
};
