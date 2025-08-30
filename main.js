@@ .. @@
     // Set current year
     document.getElementById('current-year').textContent = new Date().getFullYear();
     
-    // Mobile menu toggle
-    const mobileMenuButton = document.getElementById('mobile-menu-button');
-    const mobileMenu = document.getElementById('mobile-menu');
-    
-    mobileMenuButton?.addEventListener('click', () => {
-        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
-        mobileMenuButton.setAttribute('aria-expanded', (!isExpanded).toString());
-        mobileMenu?.classList.toggle('hidden');
-    });
-    
-    // Close mobile menu when clicking on links
-    document.querySelectorAll('.mobile-nav-link').forEach(link => {
-        link.addEventListener('click', () => {
-            mobileMenu?.classList.add('hidden');
-            mobileMenuButton.setAttribute('aria-expanded', 'false');
-        });
-    });
-    
-    // Close mobile menu when clicking outside
-    document.addEventListener('click', (e) => {
-        if (!mobileMenuButton?.contains(e.target) && !mobileMenu?.contains(e.target)) {
-            mobileMenu?.classList.add('hidden');
-            mobileMenuButton?.setAttribute('aria-expanded', 'false');
-        }
-    });
-    
     // Smooth scroll with offset for fixed header
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
         anchor.addEventListener('click', function (e) {
        });
    });