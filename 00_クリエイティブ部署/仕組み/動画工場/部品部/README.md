# 部品部（動画工場）

Remotion で動画の部品を作る部門。部品は動画工場で作り、SNS Studio からは読み込んで使う。

## 動かし方
```
npm install
npx remotion studio            # 見本を画面で見る
npx remotion render src/index.ts ReelTest out/ReelTest_v1.mp4
```
※ 本番の書き出しは工場の決まりどおり gate.py を通す（この保管庫には未着。下の台帳 B-03）。

## カタログ（Catalog フォルダ）
| 番号 | 部品 | ファイル | 主な設定 |
|---|---|---|---|
| P1 | ナベ型テロップ | src/parts/NabeTelop.tsx | text, y, color |
| P2 | 上の常設の帯 | src/parts/TopBand.tsx | title, badge |
| P3 | 画面に寄る＋カーソル＋クリックの輪 | src/parts/ZoomCursorClick.tsx | target, focus, zoom, clickAt |
| P4 | ロゴの札 | src/parts/LogoTag.tsx | name, mark, corner |
| P5 | YES/NO の二択 | src/parts/YesNo.tsx | question, pick, pickAt |

色と文字は src/theme.ts にまとめてある。部品の中に色を直接書かない。

## 再現テスト（ReelTests フォルダ）
- ReelTest：よくある「スマホ小ワザ」型のリール（13秒・1080×1920・30fps）を5部品だけで組んだもの。
  特定アカウントの複製ではなく型の再現。画面は作り物。

## 改善台帳（仮。工場の台帳に移すまでここに書く）
| 番号 | 内容 | 状態 |
|---|---|---|
| B-01 | 作業用の枝 claude/kind-dubinsky-e4f766 がこの保管庫に無く、引き継ぎ書・CLAUDE.md・工程票が未読 | 未解決（持ち主の確認待ち） |
| B-02 | ロゴの規則 LG1・顔をよける規則 TF1 が未読。LogoTag の余白、NabeTelop の位置は仮の値 | 未解決（B-01 次第） |
| B-03 | gate.py が無いので、テストの書き出しは remotion render を直接使った | 未解決（B-01 次第） |
| B-04 | Remotion の会社ライセンスの金額を remotion.pro で確かめられていない（ネット制限） | 未解決 |
| B-05 | 寄る部品で、押す点が端にあると項目名が切れた → focus（寄る中心）を足した | 済 |
