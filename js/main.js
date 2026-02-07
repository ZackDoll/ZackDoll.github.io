function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = projectData.map(project => `
        <div class="bento-item" onclick="window.location.href='${project.link}'">
            <div class="bento-icon">
                <img src="${project.icon}" alt="${project.title}">
            </div>
            <h3 class="bento-title">${project.title}</h3>
            <p class="bento-description">${project.subtitle}</p>
            <div class="bento-tags">
                ${project.tags.map(tag => `<span class="bento-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

loadProjects();

function openLightbox(imageSrc, imageAlt) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'image_view', {
            'image_alt': imageAlt,
            'event_category': 'engagement',
            'event_label': imageSrc
        });
    }
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt;
    lightboxCaption.textContent = imageAlt;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
    if (event.target.id === 'imageLightbox' || event.target.classList.contains('lightbox-close')) {
        const lightbox = document.getElementById('imageLightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightbox = document.getElementById('imageLightbox');
        if (lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

const navLinks = document.querySelectorAll('nav a');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {

            if (typeof gtag !== 'undefined') {
                gtag('event', 'navigation_click', {
                'section': this.getAttribute('href').replace('#', ''),
                'event_category': 'navigation',
                'event_label': this.textContent
                });
            }
            target.scrollIntoView({ behavior: 'smooth' });

            if (navLinks.length > 0) {
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});
document.querySelector('.newsletter-form')?.addEventListener('submit', function() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_signup', {
            'event_category': 'engagement',
            'event_label': 'buttondown_newsletter'
        });
    }
});

window.addEventListener('scroll', () => {
    if (document.body.classList.contains('viewing-project')) return;
    if (navLinks.length === 0) return;

    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});


if (typeof emailjs !== 'undefined') {
    emailjs.init("swEV8Ik2BLzd0I-an");
}

function handleSubmit(e) {
e.preventDefault();

if (typeof gtag !== 'undefined') {
    gtag('event', 'form_submit', {
        'event_category': 'contact',
        'event_label': 'contact_form'
    });
}

const btn = e.target.querySelector('button');
const originalText = btn.textContent;
btn.textContent = 'Sending...';
btn.disabled = true;

emailjs.sendForm(
'service_ik634s7',
'template_7pp3rp9',
e.target
).then(() => {
    btn.textContent = 'Sent!';
    btn.style.borderColor = '#81b29a';
    btn.style.color = '#81b29a';
    e.target.reset();
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.borderColor = '#d4a574';
        btn.style.color = '#d4a574';
        btn.disabled = false;
    }, 3000);
}).catch((error) => {
    console.error('EmailJS error:', error);
    btn.textContent = 'Failed to Send';
    btn.style.borderColor = '#ff0000';
    btn.style.color = '#ff0000';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.borderColor = '#d4a574';
        btn.style.color = '#d4a574';
        btn.disabled = false;
    }, 3000);
});
}
function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;

    const recentPosts = blogData.slice(0, 2);
    
    blogContainer.innerHTML = recentPosts.map(post => `
        <a href="${post.link}" class="blog-card">
            <div class="blog-date">${dayjs(post.date).format('MMMM D, YYYY')}</div>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <div class="blog-meta">
                <div class="blog-tags">
                    ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                </div>
                <div class="blog-read-time">${post.readTime}</div>
            </div>
        </a>
    `).join('');
}

function showBlogPost(blogId) {
    const post = blogData.find(p => p.id === blogId);
    if (!post) return;

    document.getElementById('blog-detail-title').textContent = post.title;
    document.getElementById('blog-detail-date').textContent = dayjs(post.date).format('MMMM D, YYYY');
    document.getElementById('blog-detail-read-time').textContent = post.readTime;
    
    document.getElementById('blog-detail-tags').innerHTML = post.tags.map(tag => 
        `<span class="blog-tag">${tag}</span>`
    ).join('');
    
    document.getElementById('blog-detail-content').innerHTML = post.content;

    document.body.classList.add('viewing-blog');
    document.getElementById('blog-detail').classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideBlogPost() {
    document.body.classList.remove('viewing-blog');
    document.getElementById('blog-detail').classList.remove('active');
    
    setTimeout(() => {
        document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

loadBlogPosts();
