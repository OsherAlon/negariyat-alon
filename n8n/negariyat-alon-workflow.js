import { workflow, node, trigger, sticky, expr } from '@n8n/workflow-sdk';

const HERO = 'https://res.cloudinary.com/obg18fbb/image/upload/f_auto,q_auto,c_fill,g_auto,w_1200,h_500/v1787937558/dining-table-walnut.jpg';
const OWNER = 'osherfocusai@gmail.com';

const setupTrigger = trigger({
  type: 'n8n-nodes-base.manualTrigger',
  version: 1,
  config: { name: 'Setup: Create Sheet', position: [-380, 120] },
  output: [{}]
});

const createSheet = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Create Leads Spreadsheet',
    position: [-140, 120],
    parameters: {
      resource: 'spreadsheet',
      operation: 'create',
      title: 'Negariyat Alon - Leads',
      sheetsUi: { sheetValues: [{ title: 'Leads', hidden: false }] },
      options: {}
    },
    credentials: { googleSheetsOAuth2Api: { id: 't8zScNvSSUJB4V2J', name: 'osherfocusai@gmail.com' } }
  },
  output: [{ spreadsheetId: '1AbCdEfGhIjKlMnOpQrStUvWxYz', spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/edit' }]
});

const addHeaders = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Add Column Headers',
    position: [100, 120],
    parameters: {
      resource: 'sheet',
      operation: 'append',
      documentId: { __rl: true, mode: 'id', value: expr('{{ $json.spreadsheetId }}') },
      sheetName: { __rl: true, mode: 'name', value: 'Leads' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          'תאריך': 'תאריך',
          'שם': 'שם',
          'טלפון': 'טלפון',
          'מייל': 'מייל',
          'הודעה': 'הודעה'
        },
        schema: [
          { id: 'תאריך', displayName: 'תאריך', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'שם', displayName: 'שם', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'טלפון', displayName: 'טלפון', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'מייל', displayName: 'מייל', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'הודעה', displayName: 'הודעה', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }
        ]
      },
      options: { cellFormat: 'USER_ENTERED', useAppend: true }
    },
    credentials: { googleSheetsOAuth2Api: { id: 't8zScNvSSUJB4V2J', name: 'osherfocusai@gmail.com' } }
  },
  output: [{ 'תאריך': 'תאריך', 'שם': 'שם', 'טלפון': 'טלפון', 'מייל': 'מייל', 'הודעה': 'הודעה' }]
});

const setupNote = sticky(
  '## שלב הכנה, מריצים פעם אחת\n\nלוחצים Execute על הטריגר הידני כדי ליצור את הגיליון ואת שורת הכותרות.\n\nאחרי היצירה מעתיקים את spreadsheetId מהפלט ובוחרים את הגיליון בנוד Save Lead To Sheet.',
  [setupTrigger, createSheet, addHeaders],
  { color: 3 }
);

const formWebhook = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.1,
  config: {
    name: 'Contact Form Webhook',
    position: [-380, 480],
    parameters: {
      httpMethod: 'POST',
      path: 'negariyat-alon-contact',
      responseMode: 'lastNode',
      responseData: 'firstEntryJson',
      options: {
        allowedOrigins: '*',
        responseHeaders: {
          entries: [
            { name: 'Access-Control-Allow-Origin', value: '*' },
            { name: 'Access-Control-Allow-Headers', value: 'Content-Type' }
          ]
        }
      }
    }
  },
  output: [{ body: { name: 'ישראל ישראלי', phone: '0521234567', email: 'test@example.com', message: 'מעוניין בשולחן אוכל לשישה' } }]
});

const normalize = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Normalize Form Data',
    position: [-140, 480],
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'a1', name: 'name', value: expr('{{ ($json.body?.name ?? $json.name ?? "").trim() }}'), type: 'string' },
          { id: 'a2', name: 'phone', value: expr('{{ ($json.body?.phone ?? $json.phone ?? "").trim() }}'), type: 'string' },
          { id: 'a3', name: 'email', value: expr('{{ ($json.body?.email ?? $json.email ?? "").trim() }}'), type: 'string' },
          { id: 'a4', name: 'message', value: expr('{{ ($json.body?.message ?? $json.message ?? "").trim() }}'), type: 'string' },
          { id: 'a5', name: 'submittedAt', value: expr('{{ $now.setZone("Asia/Jerusalem").toFormat("dd/MM/yyyy HH:mm") }}'), type: 'string' }
        ]
      }
    }
  },
  output: [{ name: 'ישראל ישראלי', phone: '0521234567', email: 'test@example.com', message: 'מעוניין בשולחן אוכל לשישה', submittedAt: '28/08/2026 20:45' }]
});

const mapColumns = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Map To Sheet Columns',
    position: [-20, 620],
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'c1', name: 'תאריך', value: expr('{{ $json.submittedAt }}'), type: 'string' },
          { id: 'c2', name: 'שם', value: expr('{{ $json.name }}'), type: 'string' },
          { id: 'c3', name: 'טלפון', value: expr('{{ $json.phone }}'), type: 'string' },
          { id: 'c4', name: 'מייל', value: expr('{{ $json.email }}'), type: 'string' },
          { id: 'c5', name: 'הודעה', value: expr('{{ $json.message }}'), type: 'string' }
        ]
      }
    }
  },
  output: [{ 'תאריך': '28/08/2026 20:50', 'שם': 'אושר', 'טלפון': '0526931610', 'מייל': 'osherfocusai@gmail.com', 'הודעה': 'ניסיון' }]
});

const saveLead = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Save Lead To Sheet',
    position: [100, 480],
    parameters: {
      resource: 'sheet',
      operation: 'append',
      documentId: { __rl: true, mode: 'id', value: '1Ok60WB0IqGLaEk0YXhCoZTxV_-w2Q4qsoBzqNyY1NuA', cachedResultName: 'Negariyat Alon - Leads' },
      sheetName: { __rl: true, mode: 'name', value: 'Leads' },
      columns: { mappingMode: 'autoMapInputData', value: {}, matchingColumns: [], schema: [] },
      options: { cellFormat: 'USER_ENTERED', useAppend: true, handlingExtraData: 'insertInNewColumn' }
    },
    credentials: { googleSheetsOAuth2Api: { id: 't8zScNvSSUJB4V2J', name: 'osherfocusai@gmail.com' } }
  },
  output: [{ 'תאריך': '28/08/2026 20:50', 'שם': 'ישראל ישראלי', 'טלפון': '0521234567', 'מייל': 'test@example.com', 'הודעה': 'מעוניין בשולחן אוכל לשישה' }]
});

const notifyOwner = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Notify Alon',
    position: [400, 360],
    onError: 'continueRegularOutput',
    parameters: {
      resource: 'message',
      operation: 'send',
      sendTo: OWNER,
      subject: expr('פנייה חדשה מהאתר, {{ $("Normalize Form Data").item.json.name }}'),
      emailType: 'html',
      message: expr(
        '<div dir="rtl" style="margin:0;padding:24px 12px;background:#f0eee9;font-family:Tinos,Georgia,serif;">' +
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;">' +
        '<tr><td style="padding:28px 32px 8px;text-align:center;">' +
        '<div style="font-size:19px;letter-spacing:2px;color:#2f2f2b;padding-bottom:10px;border-bottom:1px solid #b99b6b;display:inline-block;">נגריית <span style="color:#b99b6b;">אלון</span></div>' +
        '</td></tr>' +
        '<tr><td style="padding:24px 32px 4px;text-align:center;">' +
        '<div style="font-size:23px;color:#2f2f2b;">פנייה חדשה מהאתר</div>' +
        '<div style="width:60px;height:1px;background:#b99b6b;margin:14px auto 0;"></div>' +
        '<div style="font-size:15px;color:#63615a;padding-top:12px;">התקבלה בתאריך {{ $("Normalize Form Data").item.json.submittedAt }}</div>' +
        '</td></tr>' +
        '<tr><td style="padding:20px 32px 28px;">' +
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:16px;color:#2f2f2b;">' +
        '<tr><td style="padding:11px 0;border-bottom:1px solid #ddd8ce;width:88px;color:#63615a;">שם</td>' +
        '<td style="padding:11px 0;border-bottom:1px solid #ddd8ce;">{{ $("Normalize Form Data").item.json.name }}</td></tr>' +
        '<tr><td style="padding:11px 0;border-bottom:1px solid #ddd8ce;color:#63615a;">טלפון</td>' +
        '<td style="padding:11px 0;border-bottom:1px solid #ddd8ce;"><a href="tel:{{ $("Normalize Form Data").item.json.phone }}" style="color:#6e7359;text-decoration:none;">{{ $("Normalize Form Data").item.json.phone }}</a></td></tr>' +
        '<tr><td style="padding:11px 0;border-bottom:1px solid #ddd8ce;color:#63615a;">מייל</td>' +
        '<td style="padding:11px 0;border-bottom:1px solid #ddd8ce;"><a href="mailto:{{ $("Normalize Form Data").item.json.email }}" style="color:#6e7359;text-decoration:none;">{{ $("Normalize Form Data").item.json.email }}</a></td></tr>' +
        '<tr><td style="padding:11px 0;color:#63615a;vertical-align:top;">הודעה</td>' +
        '<td style="padding:11px 0;line-height:1.75;">{{ $("Normalize Form Data").item.json.message }}</td></tr>' +
        '</table>' +
        '<div style="padding-top:24px;text-align:center;">' +
        '<a href="tel:{{ $("Normalize Form Data").item.json.phone }}" style="display:inline-block;background:#6e7359;color:#ffffff;text-decoration:none;padding:13px 34px;font-size:16px;">חייג עכשיו</a>' +
        '</div>' +
        '</td></tr>' +
        '<tr><td style="padding:16px 32px 26px;border-top:1px solid #ddd8ce;text-align:center;font-size:13px;color:#63615a;">נשלח אוטומטית מטופס יצירת הקשר באתר</td></tr>' +
        '</table></div>'
      ),
      options: { appendAttribution: false, senderName: 'אתר נגריית אלון', replyTo: expr('{{ $("Normalize Form Data").item.json.email }}') }
    },
    credentials: { gmailOAuth2: { id: 'MQW2DLSkRLkXbu0m', name: 'osherfocusai@gmail.com' } }
  },
  output: [{ id: '1a2b3c', threadId: '1a2b3c', labelIds: ['SENT'] }]
});

const confirmLead = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Send Confirmation To Lead',
    position: [400, 600],
    onError: 'continueRegularOutput',
    parameters: {
      resource: 'message',
      operation: 'send',
      sendTo: expr('{{ $("Normalize Form Data").item.json.email }}'),
      subject: 'קיבלתי את הפנייה, נגריית אלון',
      emailType: 'html',
      message: expr(
        '<div dir="rtl" style="margin:0;padding:24px 12px;background:#f0eee9;font-family:Tinos,Georgia,serif;">' +
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;">' +
        '<tr><td style="padding:28px 32px 18px;text-align:center;">' +
        '<div style="font-size:19px;letter-spacing:2px;color:#2f2f2b;padding-bottom:10px;border-bottom:1px solid #b99b6b;display:inline-block;">נגריית <span style="color:#b99b6b;">אלון</span></div>' +
        '</td></tr>' +
        '<tr><td style="padding:0;">' +
        '<img src="' + HERO + '" width="600" alt="שולחן אוכל מעץ אגוז" style="display:block;width:100%;max-width:600px;height:auto;border:0;">' +
        '</td></tr>' +
        '<tr><td style="padding:28px 32px 6px;text-align:center;">' +
        '<div style="font-size:23px;color:#2f2f2b;">קיבלתי את הפנייה</div>' +
        '<div style="width:60px;height:1px;background:#b99b6b;margin:14px auto 0;"></div>' +
        '</td></tr>' +
        '<tr><td style="padding:14px 32px 4px;font-size:16px;line-height:1.85;color:#2f2f2b;">' +
        '<p style="margin:0 0 14px;">שלום {{ $("Normalize Form Data").item.json.name }},</p>' +
        '<p style="margin:0 0 14px;">הפנייה שלך הגיעה אליי ואחזור אליך בהקדם. אני עובד לבד, אז התשובה מגיעה ממני ישירות.</p>' +
        '<p style="margin:0 0 6px;color:#63615a;font-size:15px;">זה מה שנשלח:</p>' +
        '<div style="background:#f0eee9;padding:16px 18px;font-size:15px;line-height:1.75;">{{ $("Normalize Form Data").item.json.message }}</div>' +
        '</td></tr>' +
        '<tr><td style="padding:24px 32px 6px;">' +
        '<div style="font-size:17px;color:#2f2f2b;padding-bottom:12px;">איך זה ממשיך</div>' +
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:15px;color:#2f2f2b;">' +
        '<tr><td style="padding:8px 0;border-bottom:1px solid #ddd8ce;">שיחת טלפון ראשונה, להבין מה צריך</td></tr>' +
        '<tr><td style="padding:8px 0;border-bottom:1px solid #ddd8ce;">אני מגיע לבית ומודד</td></tr>' +
        '<tr><td style="padding:8px 0;border-bottom:1px solid #ddd8ce;">שולח סקיצה עם הצעת מחיר</td></tr>' +
        '<tr><td style="padding:8px 0;border-bottom:1px solid #ddd8ce;">אחרי אישור, הייצור לוקח שלושה עד שישה שבועות</td></tr>' +
        '<tr><td style="padding:8px 0;">אני מרכיב במקום, וזה כלול במחיר</td></tr>' +
        '</table></td></tr>' +
        '<tr><td style="padding:26px 32px 30px;border-top:1px solid #ddd8ce;text-align:center;font-size:15px;line-height:1.9;color:#63615a;">' +
        '<div style="color:#2f2f2b;font-size:16px;padding-bottom:6px;">נגריית אלון</div>' +
        'בית מלאכה ברחוב הבנים, פרדס חנה. בתיאום מראש.<br>' +
        '<a href="tel:+972540000000" style="color:#6e7359;text-decoration:none;">054-000-0000</a>' +
        '</td></tr>' +
        '</table></div>'
      ),
      options: { appendAttribution: false, senderName: 'נגריית אלון', replyTo: OWNER }
    },
    credentials: { gmailOAuth2: { id: 'MQW2DLSkRLkXbu0m', name: 'osherfocusai@gmail.com' } }
  },
  output: [{ id: '4d5e6f', threadId: '4d5e6f', labelIds: ['SENT'] }]
});

const webhookNote = sticky(
  '## זרימת הטופס\n\nהוובהוק מקבל POST מהטופס באתר, מנרמל את השדות, שומר שורה בגיליון, ואז שולח שני מיילים.\n\nAllowed Origins מוגדר לכוכבית לצורכי פיתוח. לפני עלייה לאוויר מחליפים בדומיין האמיתי מ-Vercel.\n\nשני נודי הגימייל מוגדרים continueRegularOutput, כדי שכשל באחד לא יחסום את השני.',
  [formWebhook, normalize, mapColumns, saveLead],
  { color: 4 }
);

const mailNote = sticky(
  '## המיילים\n\nהתראה לאלון עם כפתור חיוג ישיר, ו-Reply To מוגדר לכתובת הפונה כדי שאפשר יהיה להשיב ישירות.\n\nמייל אישור לפונה עם תמונת הגיבור מקלאודינרי ותיאור התהליך.\n\nכרגע כתובת בעל העסק היא osherfocusai@gmail.com לצורכי בדיקה.',
  [notifyOwner, confirmLead],
  { color: 5 }
);

export default workflow('negariyat-alon', 'Negariyat Alon')
  .add(setupTrigger)
  .to(createSheet)
  .to(addHeaders)
  .add(formWebhook)
  .to(normalize)
  .to(mapColumns)
  .to(saveLead)
  .to(notifyOwner)
  .add(saveLead)
  .to(confirmLead)
  .add(setupNote)
  .add(webhookNote)
  .add(mailNote);
