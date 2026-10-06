import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';

// 部品5：YES/NO の二択
// 問い＋2つの札。pickAt を渡すと、そのフレームで片方が選ばれて、もう片方が薄くなる。
export type YesNoProps = {
  question: string;
  yes?: string;
  no?: string;
  pick?: 'yes' | 'no';
  pickAt?: number;
  y?: number;
};

export const YesNo: React.FC<YesNoProps> = ({
  question,
  yes = 'YES',
  no = 'NO',
  pick,
  pickAt = 40,
  y = 700,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const q = spring({frame, fps, config: {damping: 14}});
  const a = spring({frame: frame - 6, fps, config: {damping: 12}});
  const b = spring({frame: frame - 10, fps, config: {damping: 12}});
  const chosen = pick && frame >= pickAt;
  const bump = spring({frame: frame - pickAt, fps, config: {damping: 8, stiffness: 220}});

  const card = (label: string, color: string, enter: number, kind: 'yes' | 'no') => {
    const isPicked = chosen && pick === kind;
    const isOther = chosen && pick !== kind;
    return (
      <div
        style={{
          width: 420,
          height: 300,
          borderRadius: 40,
          background: color,
          color: theme.paper,
          fontFamily: theme.font,
          fontWeight: 900,
          fontSize: 96,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 16px 0 rgba(0,0,0,0.2)',
          opacity: isOther ? 0.3 : 1,
          transform: `scale(${enter * (isPicked ? 1 + 0.12 * bump : 1)})`,
          outline: isPicked ? `14px solid ${theme.ink}` : 'none',
          outlineOffset: 8,
        }}
      >
        {label}
      </div>
    );
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 70,
      }}
    >
      <div
        style={{
          fontFamily: theme.font,
          fontWeight: 900,
          fontSize: 84,
          color: theme.ink,
          opacity: q,
          transform: `translateY(${interpolate(q, [0, 1], [30, 0])}px)`,
          textAlign: 'center',
        }}
      >
        {question}
      </div>
      <div style={{display: 'flex', gap: 60}}>
        {card(yes, theme.yes, a, 'yes')}
        {card(no, theme.no, b, 'no')}
      </div>
    </div>
  );
};
