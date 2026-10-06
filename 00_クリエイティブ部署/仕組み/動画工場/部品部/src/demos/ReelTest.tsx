import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {theme} from '../theme';
import {NabeTelop} from '../parts/NabeTelop';
import {TopBand} from '../parts/TopBand';
import {ZoomCursorClick} from '../parts/ZoomCursorClick';
import {LogoTag} from '../parts/LogoTag';
import {YesNo} from '../parts/YesNo';
import {FakeSettings, SCREEN_H, SCREEN_W, TOGGLE_POS} from './FakeSettings';

// 再現テスト：よくある「スマホ小ワザ」系インスタのリールの型を、5部品だけで組む。
// 特定のアカウントの複製ではなく、型（帯＋画面デモ＋テロップ＋二択で締め）の再現。
export const REEL_FRAMES = 390; // 13秒（30fps）

const CLICK = 160; // 画面デモの中でクリックするフレーム

export const ReelTest: React.FC = () => (
  <AbsoluteFill style={{background: theme.accentSoft}}>
    {/* 画面デモ（0〜270） */}
    <Sequence durationInFrames={270}>
      <div
        style={{
          position: 'absolute',
          top: 230,
          left: (1080 - SCREEN_W) / 2,
          borderRadius: 48,
          overflow: 'hidden',
          border: `14px solid ${theme.ink}`,
          boxShadow: '0 30px 60px rgba(0,0,0,0.25)',
        }}
      >
        <ZoomCursorClick
          width={SCREEN_W}
          height={SCREEN_H}
          target={TOGGLE_POS}
          focus={{x: SCREEN_W / 2, y: TOGGLE_POS.y}}
          from={{x: 300, y: 1050}}
          zoom={1.4}
          zoomStart={80}
          zoomEnd={115}
          cursorStart={110}
          clickAt={CLICK}
        >
          <FakeSettings offAt={CLICK} />
        </ZoomCursorClick>
      </div>
    </Sequence>

    {/* テロップ（画面の下に置き、画面の中身を隠さない） */}
    <Sequence durationInFrames={78}>
      <NabeTelop text={'通知、多すぎ\nませんか？'} y={1460} durationInFrames={78} />
    </Sequence>
    <Sequence from={80} durationInFrames={CLICK - 80}>
      <NabeTelop text="「すべての通知」を" y={1480} color={theme.sub} durationInFrames={CLICK - 80} />
    </Sequence>
    <Sequence from={CLICK} durationInFrames={110}>
      <NabeTelop text="オフにするだけ！" y={1480} durationInFrames={110} />
    </Sequence>

    {/* 締めの二択（270〜390） */}
    <Sequence from={270}>
      <YesNo question="もう やってみた？" pick="yes" pickAt={55} y={620} />
    </Sequence>

    {/* 常に出ている部品 */}
    <TopBand title="毎日1分スマホ術" badge="#12" />
    <LogoTag name="部品部テスト" />
  </AbsoluteFill>
);
