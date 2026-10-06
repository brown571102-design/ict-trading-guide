import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';

// テスト用の作り物の画面（スマホの設定画面ふう）。実在のアプリの画面ではない。
export const SCREEN_W = 900;
export const SCREEN_H = 1180;
const HEADER = 180;
const ROW = 130;
const rows = ['機内モード', 'Wi-Fi', 'Bluetooth', 'すべての通知', 'サウンド', '画面表示', '電池'];
export const TOGGLE_ROW = 3;
const PAD = 140; // 左右の余白（寄った時に項目名とスイッチが両方入るように広め）
export const TOGGLE_POS = {x: SCREEN_W - PAD - 55, y: HEADER + TOGGLE_ROW * ROW + ROW / 2};

const Toggle: React.FC<{offAt?: number; on: boolean}> = ({offAt, on}) => {
  const frame = useCurrentFrame();
  const t = offAt === undefined ? (on ? 1 : 0) : interpolate(frame, [offAt, offAt + 6], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        width: 110,
        height: 64,
        borderRadius: 32,
        background: t > 0.5 ? theme.yes : '#C9CBD1',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 5,
          left: 5 + 46 * t,
          width: 54,
          height: 54,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
        }}
      />
    </div>
  );
};

export const FakeSettings: React.FC<{offAt: number}> = ({offAt}) => (
  <div style={{width: SCREEN_W, height: SCREEN_H, background: '#F2F2F7', fontFamily: theme.font}}>
    <div style={{height: HEADER, display: 'flex', alignItems: 'flex-end', padding: `0 ${PAD}px 30px`, fontSize: 64, fontWeight: 900, color: theme.ink}}>
      設定
    </div>
    {rows.map((r, i) => (
      <div
        key={r}
        style={{
          height: ROW,
          margin: '0 0',
          background: '#fff',
          borderBottom: '2px solid #E3E3E8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `0 ${PAD}px`,
          fontSize: 46,
          fontWeight: 500,
          color: theme.ink,
        }}
      >
        <span>{r}</span>
        {i === TOGGLE_ROW ? <Toggle offAt={offAt} on /> : i === 0 ? <Toggle on={false} /> : <span style={{color: '#A0A0A8'}}>›</span>}
      </div>
    ))}
  </div>
);
