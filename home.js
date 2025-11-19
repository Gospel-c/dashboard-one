// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initSalesChart();
    initActiveUsersChart();
    
    // Add smooth animations on scroll
    observeElements();
    
    // Add interactive effects
    addInteractiveEffects();
});

// Sales Overview Chart
function initSalesChart() {
    const canvas = document.getElementById('salesChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.offsetWidth;
    const height = 300;
    
    canvas.width = width;
    canvas.height = height;
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [120, 180, 150, 220, 180, 240, 200, 280, 260, 320, 300, 350];
    const data2 = [80, 120, 100, 160, 140, 180, 160, 220, 200, 260, 240, 280];
    
    const maxValue = Math.max(...data);
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Create gradient
    const gradient1 = ctx.createLinearGradient(0, 0, 0, height);
    gradient1.addColorStop(0, 'rgba(0, 117, 255, 0.4)');
    gradient1.addColorStop(1, 'rgba(0, 117, 255, 0.01)');
    
    const gradient2 = ctx.createLinearGradient(0, 0, 0, height);
    gradient2.addColorStop(0, 'rgba(1, 181, 116, 0.4)');
    gradient2.addColorStop(1, 'rgba(1, 181, 116, 0.01)');
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw area chart 1
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    
    data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = height - padding - (value / maxValue) * chartHeight;
        
        if (index === 0) {
            ctx.lineTo(x, y);
        } else {
            const prevX = padding + (chartWidth / (data.length - 1)) * (index - 1);
            const prevY = height - padding - (data[index - 1] / maxValue) * chartHeight;
            const cpX = (prevX + x) / 2;
            ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
        }
    });
    
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient1;
    ctx.fill();
    
    // Draw line 1
    ctx.beginPath();
    data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = height - padding - (value / maxValue) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            const prevX = padding + (chartWidth / (data.length - 1)) * (index - 1);
            const prevY = height - padding - (data[index - 1] / maxValue) * chartHeight;
            const cpX = (prevX + x) / 2;
            ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
        }
    });
    ctx.strokeStyle = '#0075ff';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw area chart 2
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    
    data2.forEach((value, index) => {
        const x = padding + (chartWidth / (data2.length - 1)) * index;
        const y = height - padding - (value / maxValue) * chartHeight;
        
        if (index === 0) {
            ctx.lineTo(x, y);
        } else {
            const prevX = padding + (chartWidth / (data2.length - 1)) * (index - 1);
            const prevY = height - padding - (data2[index - 1] / maxValue) * chartHeight;
            const cpX = (prevX + x) / 2;
            ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
        }
    });
    
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient2;
    ctx.fill();
    
    // Draw line 2
    ctx.beginPath();
    data2.forEach((value, index) => {
        const x = padding + (chartWidth / (data2.length - 1)) * index;
        const y = height - padding - (value / maxValue) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            const prevX = padding + (chartWidth / (data2.length - 1)) * (index - 1);
            const prevY = height - padding - (data2[index - 1] / maxValue) * chartHeight;
            const cpX = (prevX + x) / 2;
            ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
        }
    });
    ctx.strokeStyle = '#01b574';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw month labels
    ctx.fillStyle = '#718096';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    months.forEach((month, index) => {
        const x = padding + (chartWidth / (months.length - 1)) * index;
        ctx.fillText(month, x, height - 10);
    });
}

// Active Users Bar Chart
function initActiveUsersChart() {
    const canvas = document.getElementById('activeUsersChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.offsetWidth;
    const height = 200;
    
    canvas.width = width;
    canvas.height = height;
    
    const data = [550, 380, 420, 480, 620, 720, 580, 650, 500, 450, 520, 480];
    const maxValue = Math.max(...data);
    const padding = 30;
    const chartHeight = height - padding * 2;
    const barWidth = (width - padding * 2) / data.length - 10;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#0075ff');
    gradient.addColorStop(1, '#00d4ff');
    
    data.forEach((value, index) => {
        const x = padding + index * ((width - padding * 2) / data.length) + 5;
        const barHeight = (value / maxValue) * chartHeight;
        const y = height - padding - barHeight;
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Add animation effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(0, 117, 255, 0.3)';
    });
    
    ctx.shadowBlur = 0;
}

// Observe elements for scroll animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.stat-card, .middle-grid > div, .charts-grid > div, .bottom-grid > div').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Add interactive effects
function addInteractiveEffects() {
    // Stat cards hover effect
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 40px rgba(0, 117, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Nav items animation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Animate progress bars on load
    setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 500);
    
    // Animate circular charts
    animateCircularCharts();
}

// Animate circular charts
function animateCircularCharts() {
    const circles = document.querySelectorAll('.chart-fill, .score-fill');
    
    circles.forEach(circle => {
        const percentage = circle.style.getPropertyValue('--percentage');
        circle.style.setProperty('--percentage', '0');
        
        setTimeout(() => {
            circle.style.setProperty('--percentage', percentage);
        }, 500);
    });
}

// Update stats with animation (demo)
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}
