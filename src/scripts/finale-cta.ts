// زرّ الدعوة الذي يتبدّل بحسب حال الزائر: «خطّط زيارتك» إلى دليل التخطيط، أو «افتح رحلتي (n)» متى وُجد محفوظ في va-plan.
// مشترك بين فصل الختام في الرئيسية وشريط «الخطوة التالية» في الصفحات الداخلية؛ النصوص والروابط تأتي من سمات العنصر نفسه.
function syncFinale(): void {
  const n: number = (window.VAPlan?.get?.() ?? []).length;
  const has = n > 0;
  document.querySelectorAll<HTMLAnchorElement>('[data-finale-cta]').forEach((a) => {
    a.href = (has ? a.dataset.tripHref : a.dataset.planHref) || a.href;
    a.textContent = has ? `${a.dataset.txOpen} (${n})` : (a.dataset.txPlan || '');
    a.dataset.trackKind = has ? 'my_trip' : 'plan';
  });
}
document.addEventListener('astro:page-load', syncFinale);
document.addEventListener('va-plan-change', syncFinale);
if (document.readyState !== 'loading') syncFinale();
