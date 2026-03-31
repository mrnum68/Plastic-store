# Hướng dẫn kết nối Google Sheets nhận Lead

## Bước 1: Tạo Google Sheet

1. Vào [Google Sheets](https://sheets.google.com) → Tạo bảng tính mới
2. Đặt tên: **"Lead Dự Toán Nội Thất Huy Hoàng"**
3. Ở dòng 1 (header), gõ các cột sau:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Thời gian | Số điện thoại | Sản phẩm | Chất liệu | Tổng tiền | Ghi chú |

## Bước 2: Thêm Apps Script

1. Trong Google Sheet, vào menu **Extensions** (Tiện ích mở rộng) → **Apps Script**
2. Xóa hết code mặc định, rồi dán đoạn code sau:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date().toLocaleString('vi-VN'),
    data.phone,
    data.items,
    data.material,
    data.total,
    data.note || ''
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Nhấn **Save** (Ctrl+S), đặt tên project: "Lead Receiver"

## Bước 3: Deploy (Triển khai)

1. Nhấn nút **Deploy** (Triển khai) → **New deployment** (Triển khai mới)
2. Ở **Type** (Loại), chọn **Web app**
3. Cấu hình:
   - **Description**: Lead Receiver
   - **Execute as**: Me (tài khoản của bạn)
   - **Who has access**: **Anyone** (Bất kỳ ai)
4. Nhấn **Deploy** → Cấp quyền khi được hỏi
5. Copy **Web app URL** (dạng: `https://script.google.com/macros/s/AKfyc.../exec`)

## Bước 4: Cập nhật vào website

Mở file `src/app/du-toan/page.tsx`, tìm dòng:

```
const GOOGLE_SHEET_URL = "";
```

Dán URL đã copy vào:

```
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfyc.../exec";
```

**Done!** Mỗi khi khách gửi SĐT, data tự động vào Google Sheet ✅
