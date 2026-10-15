/* Hub-only presentation. Do not import this into individual simulation HTML files. */
(() => {
  'use strict';
  const data = window.SIMLAB_CATALOG;
  const body = document.body;
  if (!data) return;
  const base = body.getAttribute('data-base') || './';
  const internal = p => base + p;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const count = id => data.tools.filter(t => t.course === id).length;
  const courses = document.querySelector('#course-list');
  if (courses) {
    courses.innerHTML = data.courses.map(c => `
      <a class="course-card ${esc(c.id)}" href="${esc(internal('courses/'+c.slug+'/index.html'))}" aria-label="${esc(c.title)} 학습도구 ${count(c.id)}개 보기">
        <span class="course-number">${esc(c.overline)}</span>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.description)}</p>
        <div class="course-bottom"><span>${c.kind === 'local' ? '직접 실행하는 도구' : '기존 도구로 연결'} · ${count(c.id)}개</span><span class="course-cta">도구 보기 <span aria-hidden="true">→</span></span></div>
      </a>`).join('');
  }
  const list = document.querySelector('#tool-list');
  const courseId = body.dataset.course;
  if (list && courseId) {
    const course = data.courses.find(c=>c.id===courseId);
    const tools = data.tools.filter(t=>t.course===courseId).sort((a,b)=>a.order-b.order);
    const heading = document.querySelector('#tool-count');
    if (heading) heading.textContent = `학습도구 ${tools.length}개`;
    list.innerHTML = tools.map(t => `<a class="tool-card" href="${esc(t.external?t.path:internal(t.path))}" ${t.external?'target="_blank" rel="noopener noreferrer"':''} aria-label="${esc(t.title)} ${t.external?'외부 사이트 새 탭에서 열기':'실험 시작하기'}">
      <div class="tool-top"><span class="week">${esc(t.week)}</span><span class="tool-type">${esc(t.label)}</span></div>
      <h3>${esc(t.title)}</h3><p>${esc(t.description)}</p>
      <div class="tool-bottom"><span>${esc(t.external?'기존 도구 열기':'실험 시작하기')} ${t.external?'<span class="sr-only">(새 탭에서 열림)</span>':''}</span><span class="tool-arrow" aria-hidden="true">${t.external?'↗':'→'}</span></div>
    </a>`).join('');
    const note = document.querySelector('#course-note');
    if (course && note) note.textContent = course.note;
  }
})();
