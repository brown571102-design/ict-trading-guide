import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';

// 部品2：上の常設の帯
// 動画のあいだずっと上に出しておく帯（シリーズ名＋回数など）。
export type TopBandProps = {
  title: string;
  badge?: string; // 右の小札（例：#12）
  height?: number;
};

export const TopBand: React.FC<TopBandProps> = ({title, badge, height = 150}) => {
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [0, 10], [-height, 0], {
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        top: slide,
        left: 0,
        right: 0,
        height,
        background: theme.ink,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        fontFamily: theme.font,
        borderBottom: `8px solid ${theme.accent}`,
      }}
    >
      <span style={{color: theme.paper, fontWeight: 900, fontSize: 56}}>{title}</span>
      {badge ? (
        <span
          style={{
            background: theme.accent,
            color: theme.paper,
            fontWeight: 900,
            fontSize: 40,
            padding: '6px 20px',
            borderRadius: 999,
          }}
        >
          {badge}
        </span>
      ) : null}
    </div>
  );
};
