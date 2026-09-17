type PasswordResetTemplateInput = {
  resetUrl: string;
  userName?: string;
};

const logoUrl = 'https://www.paneltakip.com/paneltakip-logo-transparent.png';

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function buildPasswordResetEmail({
  resetUrl,
  userName = 'PanelTakip Yöneticisi',
}: PasswordResetTemplateInput) {
  const safeUrl = escapeHtml(resetUrl);
  const safeName = escapeHtml(userName);

  const subject = 'PanelTakip | Şifrenizi oluşturun';
  const text = `${safeName},\n\nPanelTakip yönetim panelinize güvenli erişim için şifre oluşturma talebinizi aldık.\n\nŞifrenizi oluşturun: ${resetUrl}\n\nBu bağlantı 1 saat süreyle geçerlidir. Bu talebi siz yapmadıysanız bu e-postayı dikkate almayabilirsiniz.\n\nPanelTakip — Restoran Büyüme & Yönetim Hizmeti`;

  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f7f8;font-family:Arial,Helvetica,sans-serif;color:#10202b;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;background-color:#f4f7f8;">
    <tr>
      <td align="center" style="padding-top:24px;padding-right:14px;padding-bottom:24px;padding-left:14px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:20px;overflow:hidden;">
          <tr>
            <td style="padding-top:22px;padding-right:28px;padding-bottom:18px;padding-left:28px;border-bottom:1px solid #e8eef1;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
                <tr>
                  <td valign="middle" style="font-size:13px;line-height:18px;color:#65737d;">Restoranların büyüme ortağı</td>
                  <td align="right" valign="middle" style="font-size:13px;line-height:18px;color:#65737d;">paneltakip.com</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:24px;padding-right:28px;padding-bottom:8px;padding-left:28px;">
              <img src="${logoUrl}" width="180" height="58" border="0" alt="PanelTakip" style="display:block;width:180px;height:58px;object-fit:contain;">
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:8px;padding-right:34px;padding-bottom:0;padding-left:34px;">
              <p style="margin-top:0;margin-right:0;margin-bottom:8px;margin-left:0;font-size:13px;line-height:20px;letter-spacing:2px;font-weight:700;color:#5b6972;">PANELTAKİP</p>
              <h1 style="margin-top:0;margin-right:0;margin-bottom:14px;margin-left:0;font-size:34px;line-height:40px;font-weight:800;color:#0f1720;">Şifrenizi <span style="color:#06b6d4;">Oluşturun</span></h1>
              <p style="margin-top:0;margin-right:0;margin-bottom:8px;margin-left:0;font-size:17px;line-height:27px;color:#263742;">Merhaba ${safeName},</p>
              <p style="margin-top:0;margin-right:0;margin-bottom:22px;margin-left:0;font-size:16px;line-height:26px;color:#52616b;">PanelTakip yönetim panelinize güvenli erişebilmeniz için şifre oluşturma talebinizi aldık.</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:0;padding-right:34px;padding-bottom:10px;padding-left:34px;">
              <table cellpadding="0" cellspacing="0" border="0" role="presentation">
                <tr>
                  <td align="center" bgcolor="#09b8c8" style="background-color:#09b8c8;border-radius:12px;">
                    <a href="${safeUrl}" style="display:inline-block;padding-top:15px;padding-right:34px;padding-bottom:15px;padding-left:34px;font-size:17px;line-height:22px;font-weight:800;color:#ffffff;text-decoration:none;">Şifremi Oluştur&nbsp;&nbsp;→</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:6px;padding-right:34px;padding-bottom:24px;padding-left:34px;">
              <p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:13px;line-height:21px;color:#7a8790;">Bu bağlantı 1 saat süreyle geçerlidir.</p>
            </td>
          </tr>
          <tr>
            <td style="padding-top:0;padding-right:28px;padding-bottom:20px;padding-left:28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;background-color:#f6fafb;border-radius:14px;">
                <tr>
                  <td width="33%" align="center" style="padding-top:18px;padding-right:8px;padding-bottom:18px;padding-left:8px;font-size:13px;line-height:19px;color:#51606a;"><strong style="font-size:14px;line-height:20px;color:#12222d;">Güvenli Erişim</strong><br>Hesabınız güvende.</td>
                  <td width="33%" align="center" style="padding-top:18px;padding-right:8px;padding-bottom:18px;padding-left:8px;border-left:1px solid #e3ebee;border-right:1px solid #e3ebee;font-size:13px;line-height:19px;color:#51606a;"><strong style="font-size:14px;line-height:20px;color:#12222d;">Sadece Sizin İçin</strong><br>Bağlantı size özeldir.</td>
                  <td width="33%" align="center" style="padding-top:18px;padding-right:8px;padding-bottom:18px;padding-left:8px;font-size:13px;line-height:19px;color:#51606a;"><strong style="font-size:14px;line-height:20px;color:#12222d;">Sınırlı Süre</strong><br>1 saat sonra geçersiz.</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-top:0;padding-right:28px;padding-bottom:24px;padding-left:28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;background-color:#f8f9fa;border-radius:14px;">
                <tr>
                  <td style="padding-top:17px;padding-right:18px;padding-bottom:17px;padding-left:18px;font-size:14px;line-height:22px;color:#66747d;"><strong style="font-size:15px;line-height:22px;color:#162630;">Bu talebi siz yapmadıysanız</strong><br>Bu e-postayı dikkate almayın. Herhangi bir işlem yapmanıza gerek yoktur.</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="#061e2a" style="background-color:#061e2a;padding-top:20px;padding-right:28px;padding-bottom:20px;padding-left:28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
                <tr>
                  <td style="font-size:14px;line-height:20px;color:#ffffff;font-weight:700;">PanelTakip</td>
                  <td align="right" style="font-size:13px;line-height:20px;color:#a9b9c2;">Restoranların büyüme ortağı</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;max-width:600px;">
          <tr>
            <td align="center" style="padding-top:16px;padding-right:20px;padding-bottom:0;padding-left:20px;font-size:12px;line-height:18px;color:#8a969d;">© 2026 PanelTakip. Bu e-posta sistem tarafından otomatik olarak gönderilmiştir.</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
