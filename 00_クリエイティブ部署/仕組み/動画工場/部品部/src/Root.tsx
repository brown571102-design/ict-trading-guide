import React from 'react';
import {AbsoluteFill, Composition, Folder} from 'remotion';
import {theme} from './theme';
import {NabeTelop} from './parts/NabeTelop';
import {TopBand} from './parts/TopBand';
import {ZoomCursorClick} from './parts/ZoomCursorClick';
import {LogoTag} from './parts/LogoTag';
import {YesNo} from './parts/YesNo';
import {ReelTest, REEL_FRAMES} from './demos/ReelTest';

const W = 1080;
const H = 1920;
const FPS = 30;

// カタログ用の下地（部品を1つだけ置いて見る）
const Bg: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{background: '#D9DCE3'}}>{children}</AbsoluteFill>
);

const Box: React.FC = () => (
  <div style={{width: 900, height: 1180, background: '#fff', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, padding: 40, boxSizing: 'border-box'}}>
    {Array.from({length: 12}).map((_, i) => (
      <div key={i} style={{background: i === 7 ? theme.accent : '#EEF0F4', borderRadius: 24}} />
    ))}
  </div>
);

export const Root: React.FC = () => (
  <>
    <Folder name="Catalog">
      <Composition id="P1-NabeTelop" width={W} height={H} fps={FPS} durationInFrames={60}
        component={() => <Bg><NabeTelop text={'ナベ型テロップ\nの見本です'} y={820} /></Bg>} />
      <Composition id="P2-TopBand" width={W} height={H} fps={FPS} durationInFrames={30}
        component={() => <Bg><TopBand title="シリーズ名がここ" badge="#1" /></Bg>} />
      <Composition id="P3-ZoomCursorClick" width={W} height={H} fps={FPS} durationInFrames={90}
        component={() => (
          <Bg>
            <div style={{position: 'absolute', top: 370, left: 90}}>
              <ZoomCursorClick width={900} height={1180} target={{x: 450, y: 760}} clickAt={60}>
                <Box />
              </ZoomCursorClick>
            </div>
          </Bg>
        )} />
      <Composition id="P4-LogoTag" width={W} height={H} fps={FPS} durationInFrames={30}
        component={() => <Bg><LogoTag name="ロゴの札" corner="top-right" /><LogoTag name="ロゴの札" /></Bg>} />
      <Composition id="P5-YesNo" width={W} height={H} fps={FPS} durationInFrames={90}
        component={() => <Bg><YesNo question="どっち？" pick="no" pickAt={50} /></Bg>} />
    </Folder>
    <Folder name="ReelTests">
      <Composition id="ReelTest" component={ReelTest} width={W} height={H} fps={FPS} durationInFrames={REEL_FRAMES} />
    </Folder>
  </>
);
