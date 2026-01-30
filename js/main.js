function showProject(projectId) {
    const project = projectData[projectId];
    if (!project) return;


     if (typeof gtag !== 'undefined') {
        gtag('event', 'project_view', {
        'project_name': projectId,
        'project_title': project.title,
        'event_category': 'engagement',
        'event_label': projectId
        });
    }
    document.getElementById('detail-title').textContent = project.title;
    document.getElementById('detail-subtitle').textContent = project.subtitle;

    const linksContainer = document.getElementById('detail-links');
    linksContainer.innerHTML = project.links.map(link => 
        `<a href="${link.url}" class="project-link" target="_blank" rel="noopener noreferrer">
            ${link.text} →
        </a>`
    ).join('');

    const tagsContainer = document.getElementById('detail-tags');
    tagsContainer.innerHTML = project.tags.map(tag => 
        `<span class="bento-tag">${tag}</span>`
    ).join('');

    const contentContainer = document.getElementById('detail-content');
    contentContainer.innerHTML = project.sections.map(section => `
        <div class="project-detail-section">
            <h3>${section.title}</h3>
            ${section.content ? `<p>${section.content}</p>` : ''}
            ${section.bullets ? `
                <ul>
                    ${section.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                </ul>
            ` : ''}
        </div>
    `).join('');

    if (project.images && project.images.length > 0) {
        const imagesHtml = `
            <div class="project-detail-section">
                <h3>Gallery</h3>
                <div class="project-images">
                    ${project.images.map(img => `
                        <div class="project-image">
                            ${img.src ? `<img src="${img.src}" alt="${img.alt}">` : img.alt}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        contentContainer.innerHTML += imagesHtml;


        setTimeout(() => {
            document.querySelectorAll('.project-image img').forEach(img => {
                img.addEventListener('click', function() {
                    openLightbox(this.src, this.alt);
                });
            });
        }, 100);
    }

    const techStackHtml = `
        <div class="project-detail-section">
            <h3>Technologies Used</h3>
            <div class="tech-stack-grid">
                ${project.tags.map(tag => `
                    <div class="tech-item">${tag}</div>
                `).join('')}
            </div>
        </div>
    `;
    contentContainer.innerHTML += techStackHtml;

    document.body.classList.add('viewing-project');
    document.getElementById('project-detail').classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideProject() {
    document.body.classList.remove('viewing-project');
    document.getElementById('project-detail').classList.remove('active');
    
    setTimeout(() => {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

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

const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

if (cursor && cursorDot) {
    let initialized = false;
    
    //hide cursor initially
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
    
    document.addEventListener('mousemove', (e) => {
        if (!initialized) {
            initialized = true;
        }
        
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursorDot.style.left = e.clientX - 4 + 'px';
        cursorDot.style.top = e.clientY - 4 + 'px';
    });
    
    //hide cursor when mouse leaves the page
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    
    //show cursor when mouse re-enters the page
    document.addEventListener('mouseenter', () => {
        if (initialized) {
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
        }
    });
}

document.querySelectorAll('a, button, .bento-item, .skill-node').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 170, 0.3)';
        ctx.fill();
    }
}

for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 255, 170, ${0.1 * (1 - distance / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
}

animate();

const roles = ['Web Developer', 'AI/ML Engineer', 'UI/UX Designer', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById('typed');

function typeWriter() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typedElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

typeWriter();

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
            
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
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


emailjs.init("swEV8Ik2BLzd0I-an");

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
    btn.style.borderColor = '#00ff00';
    btn.style.color = '#00ff00';
    e.target.reset();
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.borderColor = '#00ffaa';
        btn.style.color = '#00ffaa';
        btn.disabled = false;
    }, 3000);
}).catch((error) => {
    console.error('EmailJS error:', error);
    btn.textContent = 'Failed to Send';
    btn.style.borderColor = '#ff0000';
    btn.style.color = '#ff0000';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.borderColor = '#00ffaa';
        btn.style.color = '#00ffaa';
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
