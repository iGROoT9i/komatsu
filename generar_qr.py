import qrcode
from PIL import Image, ImageDraw, ImageFont
import os

def create_komatsu_qr(url, output_filename):
    # 1. Generate Base QR Code with High Error Correction (allows logo to cover part of it)
    qr = qrcode.QRCode(
        version=5,
        error_correction=qrcode.constants.ERROR_CORRECT_H, 
        box_size=12,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)

    # Create the QR code image
    qr_img = qr.make_image(fill_color="black", back_color="white").convert('RGB')
    qr_width, qr_height = qr_img.size

    # 2. Add Logo to Center
    # We will draw a white box with blue "KOMATSU" text
    logo_w = int(qr_width * 0.35)
    logo_h = int(qr_height * 0.12)
    logo_img = Image.new('RGB', (logo_w, logo_h), 'white')
    draw_logo = ImageDraw.Draw(logo_img)
    
    # Try to load Windows Arial Bold, otherwise fallback
    try:
        font = ImageFont.truetype("C:\\Windows\\Fonts\\arialbd.ttf", int(logo_h * 0.6))
    except:
        try:
            font = ImageFont.truetype("arialbd.ttf", int(logo_h * 0.6))
        except:
            font = ImageFont.load_default()
    
    # Calculate text size to center it
    bbox = draw_logo.textbbox((0, 0), "KOMATSU", font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    
    # Draw text in Komatsu blue
    draw_logo.text(((logo_w - text_w) / 2, (logo_h - text_h) / 2 - 4), "KOMATSU", fill="#0033a0", font=font, stroke_width=1, stroke_fill="#0033a0")

    # Paste logo in center of QR
    pos = ((qr_width - logo_w) // 2, (qr_height - logo_h) // 2)
    qr_img.paste(logo_img, pos)

    # 3. Create Clipboard Frame
    bg_width = qr_width + 120
    bg_height = qr_height + 250
    bg_img = Image.new('RGB', (bg_width, bg_height), '#f0f0f0')
    draw_bg = ImageDraw.Draw(bg_img)

    # Board
    board_x1 = 20
    board_y1 = 80
    board_x2 = bg_width - 20
    board_y2 = bg_height - 20
    draw_bg.rounded_rectangle([board_x1, board_y1, board_x2, board_y2], radius=15, fill="white", outline="#444444", width=12)

    # Top clip part 1 (the hanger hook)
    hanger_w = 40
    hanger_h = 30
    h_x1 = (bg_width - hanger_w) // 2
    h_y1 = 40
    h_x2 = h_x1 + hanger_w
    h_y2 = h_y1 + hanger_h
    draw_bg.rounded_rectangle([h_x1, h_y1, h_x2, h_y2], radius=15, fill="#f0f0f0", outline="#444444", width=12)

    # Top clip part 2 (the wide base)
    clip_base_w = 180
    clip_base_h = 40
    cb_x1 = (bg_width - clip_base_w) // 2
    cb_y1 = 60
    cb_x2 = cb_x1 + clip_base_w
    cb_y2 = cb_y1 + clip_base_h
    draw_bg.rounded_rectangle([cb_x1, cb_y1, cb_x2, cb_y2], radius=15, fill="#444444")
    
    # Paste QR code onto board
    qr_pos = ((bg_width - qr_width) // 2, board_y1 + 40)
    bg_img.paste(qr_img, qr_pos)

    # Draw "ESCANÉAME" text at the bottom
    try:
        font_scan = ImageFont.truetype("C:\\Windows\\Fonts\\arialbd.ttf", 40)
    except:
        try:
            font_scan = ImageFont.truetype("arialbd.ttf", 40)
        except:
            font_scan = ImageFont.load_default()
        
    text_scan = "ESCANÉAME"
    bbox_scan = draw_bg.textbbox((0, 0), text_scan, font=font_scan)
    ts_w = bbox_scan[2] - bbox_scan[0]
    ts_pos = ((bg_width - ts_w) // 2, board_y2 - 70)
    draw_bg.text(ts_pos, text_scan, fill="black", font=font_scan)

    # Save final image
    bg_img.save(output_filename)
    print(f"QR code generado exitosamente como '{output_filename}'!")

if __name__ == '__main__':
    url = "https://komatsu-nine.vercel.app"
    output = "public/images/qr_komatsu_clip.png"
    create_komatsu_qr(url, output)
