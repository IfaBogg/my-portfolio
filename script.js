// selecting btn
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
const topBtn = document.getElementById('backToTop');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeBtn.textContent = "Light Mode";
}

// Dark mode
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    let theme = 'light';
    if (document.body.classList.contains('dark-theme')) {
        theme = 'dark';
        themeBtn.textContent = "Light Mode";
    } else {
        themeBtn.textContent = "Dark Mode"
    }
    localStorage.setItem('theme', theme);
});

// Show back to top
window.onscroll = () => {
    if (document.documentElement.scrollTop > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// home
const textElement = document.getElementById('typing-text');
const words = ["Computer Scientist", "QA Professional", "Full-Stack Enthusiast"];
let wordIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < words[wordIndex].length) {
        textElement.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        textElement.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    }
}

// Start the effect when the page loads
document.addEventListener('DOMContentLoaded', type);



/// Contact Section
/// Contact Section
const contactForm = document.getElementById('contact-form');
const successBanner = document.getElementById('success-banner');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Capture data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Reset errors
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    let isFormValid = true;

    // 1. Name Validation
    if (name === "") {
        document.getElementById('name-error').textContent = "Name cannot be empty";
        isFormValid = false;
    }

    // 2. Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('email-error').textContent = "Invalid format.";
        document.getElementById('email').style.borderColor = "red"; // Add this
        isFormValid = false;
    } else {
        document.getElementById('email').style.borderColor = "green"; // Add this
    }
    // 3. Message Validation
    if (message.length < 10) {
        document.getElementById('message-error').textContent = "Message is too short (min 10 chars).";
        isFormValid = false;
    }

    // 4. Success Check
    if (isFormValid) {
        successBanner.classList.remove('hidden');
        contactForm.reset();
        
        // Hide banner after 4 seconds
        setTimeout(() => {
            successBanner.classList.add('hidden');
        }, 4000);
    }
});



//Data: Array of Objects
const myProjects = [
    {
        title: "Portifolio Website",
        description: "A personal portifolio built with HTML, CSS, and JS.",
        tech: "HTML/CSS"
    },
    {
        title: "Theme Toggle",
        description: "A dark mode feature using DOM manipulation.",
        tech: "JavaScript"
    },
    {
        title: "Form Validator",
        description: "A contact form with regex validation logic.",
        tech: "QA/Testing"
    },
    {
        title: "Future Project",
        description: "This card was generated dynamically!",
        tech: "React"
    }
];

// container 
const projectContainer = document.getElementById('projects-container');
const filterBtns = document.querySelectorAll('.filter-btn');

// function
function displayProjects(category = "All") {
    projectContainer.innerHTML = ""; // clear existing content

    const filteredProjects = category === "All"
        ? myProjects
        : myProjects.filter(project => project.tech.includes(category));

    // loop through the array
    filteredProjects.forEach(project => {
        //html string for one card
        const projectCard = `
            <div class="projects-item">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <small style="color: #007bff; font-weight: bold;">${project.tech}</small>
            </div>
        `;

        // inject into container
        projectContainer.innerHTML += projectCard;
    });
}

// eventlisteners to buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedCategory = btn.getAttribute('data-filter');
        displayProjects(selectedCategory);
    });
});

// run function when page loads
document.addEventListener('DOMContentLoaded', displayProjects);

// --- API FETCHING EXAMPLE ---

const testimonialContainer = document.getElementById('testimonial-container');

async function fetchTestimonials() {
    try {
        // 1. Make the request (The "Order")
        // We use a free fake API that returns user data
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        // 2. Check if the response is valid
        if (!response.ok) {
            throw new Error("Could not fetch resources");
        }

        // 3. Convert the "raw" response to JSON (The "Food")
        const users = await response.json();

        // 4. Clear the "Loading..." text
        testimonialContainer.innerHTML = "";

        // 5. Loop through only the first 3 users
        const firstThreeUsers = users.slice(0, 3); 

        firstThreeUsers.forEach(user => {
            // We are pretending their 'company catchphrase' is a review
            const card = `
                <div class="testimonial-item">
                    <p>"${user.company.catchPhrase}."</p>
                    <span class="testimonial-author">- ${user.name}</span>
                </div>
            `;
            testimonialContainer.innerHTML += card;
        });

    } catch (error) {
        // If the internet is down, show this:
        console.error(error);
        testimonialContainer.innerHTML = "<p style='color:red;'>Failed to load testimonials. Please try again later.</p>";
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchTestimonials);

