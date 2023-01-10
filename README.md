# Attendance-Chaser
![圖片](https://user-images.githubusercontent.com/108853120/210808024-2bf2205e-5d31-4a6f-8250-24b867227994.png)
- 由此進入 [demo](https://nancy-hsu.github.io/Attendance-Chaser-frontEnd/#/login) 頁面
- 遠端帳號： 000006，密碼： titaner ( 設定為遠端工作，可直接打卡 )
- 一般帳號： 000007，密碼： titaner ( 設定為打卡時需 GPS 驗證 )
- 管理者帳號： 000001，密碼： titaner ( 有 QRcode reader 功能，解析後打卡，模擬公司裡的門閘 )

## 功能
- 使用者可登入登出並修改密碼。
- 密碼錯誤五次，帳號即上鎖 30 分鐘。
- 首頁：遠端工作者可一鍵打卡，一般使用者需先驗證 GPS 打卡。
- 出勤異常顯示：當月及上個月工作日中，出勤未滿 8 小時的記錄。(暫不支援跨年度)
- 打卡只記錄當日第一次及最後一次，換日時間為上午五點 (GMT+8)。
- QR code 打卡功能，一般使用者可產生 QRcode，管理者帳號才能解析 QRcode 並打卡。

## 安裝流程

1. 將專案 clone 到本地 `git clone https://github.com/Nancy-Hsu/Attendance-Chaser-frontEnd.git`

2. 在本地開啟之後，透過終端機進入資料夾，輸入： `npm install`

3. 請參考.env.example建立.env檔案，並填入所需資訊 `touch .env`

4. 繼續輸入： `npm run dev`  啟動專案 

5. 若看見此行訊息則代表順利運行， `VITE v4.0.3  ready in xxxx ms`

6. 接下來就可以打開瀏覽器進入以下網址 [http://127.0.0.1:5173/Attendance-Chaser-frontEnd/](http://127.0.0.1:5173/Attendance-Chaser-frontEnd/) 開始使用囉！

7. 若欲暫停使用，按下 `ctrl + c` 即可

## 開發工具
- runtime: Vue3
- frame: Vite

## 後端專案連結
- [Backend](https://github.com/Nancy-Hsu/Attendance-Chaser-backend) 

