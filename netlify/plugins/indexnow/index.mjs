// إضافة Netlify: تُشعِر IndexNow بعد نجاح النشر لا قبله.
import path from 'node:path';
import { run } from './submit.mjs';

export const onSuccess = async ({ constants, utils }) => {
  const cwd = process.cwd();
  const distDir = path.resolve(cwd, constants.PUBLISH_DIR ?? 'dist');
  const msg = await run({ distDir, cwd, dryRun: process.env.INDEXNOW_DRY_RUN === '1' });
  console.log(msg);
  // ملاحظة في ملخّص النشر — ولا فشل مهما كانت النتيجة
  utils?.status?.show?.({ title: 'IndexNow', summary: msg });
};
