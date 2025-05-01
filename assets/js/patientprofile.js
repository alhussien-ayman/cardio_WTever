// Create dynamic bubbles
function createBubbles() {
    const colors = ['rgba(247, 85, 109, 0.08)', 'rgba(109, 95, 247, 0.08)', 'rgba(95, 247, 178, 0.08)'];
    for (let i = 0; i < 8; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 100 + 50;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${posX}%`;
        bubble.style.top = `${posY}%`;
        bubble.style.animationDelay = `${delay}s`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.background = color;
        
        document.body.appendChild(bubble);
    }
  }
  
  // Dynamic ECG Path Generator
  function generateECGPath() {
    let path = "M0,25 ";
    const segments = 20;
    const segmentWidth = 500 / segments;
    
    for(let i = 0; i < segments; i++) {
        const x = i * segmentWidth;
        const nextX = (i + 1) * segmentWidth;
        const midX = x + segmentWidth/2;
        
        if(i % 4 === 0) {
            // Normal heartbeat
            path += `L${midX-10},25 `;
            path += `L${midX-5},10 `;
            path += `L${midX},25 `;
            path += `L${midX+5},40 `;
            path += `L${midX+10},25 `;
        } else {
            // Flat line
            path += `L${nextX},25 `;
        }
    }
    
    return path;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    createBubbles();
    
    // Initialize ECG path
    const ecgPath = document.querySelector('.ecg-path');
    const points = generateECGPath();
    ecgPath.setAttribute('d', points);
    
    // Animate ECG line drawing
    setInterval(() => {
        const newPoints = generateECGPath();
        ecgPath.setAttribute('d', newPoints);
    }, 6000);
    
    // Animation on scroll
    const sections = document.querySelectorAll('.info-section, .info-grid');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateX(0) translateZ(0)';
            }
        });
    }, { threshold: 0.1 });
  
    sections.forEach(section => {
        observer.observe(section);
    });
  
    // Change photo interaction
    const changePhotoBtn = document.querySelector('.change-photo');
    const profilePhoto = document.querySelector('.profile-photo');
    
    if (profilePhoto && changePhotoBtn) {
        profilePhoto.addEventListener('click', (e) => {
            if (e.target === changePhotoBtn) {
                // Animation for photo change
                profilePhoto.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    profilePhoto.style.transform = 'scale(1)';
                    alert('Photo change functionality would go here');
                }, 300);
            }
        });
    }
  
    // Add note functionality
    const addNoteBtn = document.querySelector('.add-note-btn');
    const noteTextarea = document.querySelector('.new-note textarea');
    
    addNoteBtn.addEventListener('click', () => {
        if (noteTextarea.value.trim()) {
            const notesSection = document.querySelector('.notes-section');
            const newNote = document.createElement('div');
            newNote.className = 'note-item';
            newNote.innerHTML = `
                <div>${noteTextarea.value}</div>
                <div class="note-date"><i class="far fa-calendar-alt"></i> Added just now</div>
            `;
            notesSection.prepend(newNote);
            noteTextarea.value = '';
            
            // Animate the new note
            newNote.style.opacity = 0;
            newNote.style.transform = 'translateY(30px) rotateX(90deg)';
            newNote.style.transformOrigin = 'top center';
            setTimeout(() => {
                newNote.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                newNote.style.opacity = 1;
                newNote.style.transform = 'translateY(0) rotateX(0)';
            }, 10);
  
            // Animate the notes section
            notesSection.style.transform = 'translateZ(20px) translateY(-5px)';
            setTimeout(() => {
                notesSection.style.transform = 'translateZ(10px) translateY(0)';
            }, 600);
        }
    });
  
    // Floating action button
    const fab = document.querySelector('.fab');
    fab.addEventListener('click', () => {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.background = 'rgba(255,255,255,0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.transform = 'scale(0)';
        ripple.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
        
        fab.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.transform = 'scale(2)';
            ripple.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
            // Show quick actions menu
            alert('Quick actions menu would appear here');
        }, 600);
    });
  });
  
  // Insurance Edit/Save functionality
  document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.querySelector('.edit-insurance-btn');
    const saveBtn = document.querySelector('.save-insurance-btn');
    let originalValues = {};
  
    editBtn.addEventListener('click', () => {
        // Store original values
        document.querySelectorAll('.info-section.section-4 .info-value').forEach(item => {
            const field = item.getAttribute('data-field');
            originalValues[field] = item.textContent;
            
            // Create input field
            const input = document.createElement('input');
            input.type = 'text';
            input.value = item.textContent;
            item.textContent = '';
            item.appendChild(input);
            item.classList.add('editable');
        });
  
        // Toggle buttons
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
    });
  
    saveBtn.addEventListener('click', () => {
        // Save new values
        document.querySelectorAll('.info-section.section-4 .info-value').forEach(item => {
            const input = item.querySelector('input');
            if (input) {
                item.textContent = input.value || originalValues[item.getAttribute('data-field')];
                item.classList.remove('editable');
            }
        });
  
        // Toggle buttons
        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
        
        // Here you would typically send the data to your server
        console.log('Insurance data saved');
    });
  });
  
  
  // Medical History Edit/Save Functionality
  document.addEventListener('DOMContentLoaded', () => {
    const editMedBtn = document.querySelector('.edit-medical-btn');
    const saveMedBtn = document.querySelector('.save-medical-btn');
    let originalMedValues = {};
  
    editMedBtn.addEventListener('click', () => {
        // Store original values
        document.querySelectorAll('.medical-history-value').forEach(item => {
            const field = item.getAttribute('data-field');
            originalMedValues[field] = item.textContent;
            
            // Create textarea field
            const textarea = document.createElement('textarea');
            textarea.value = item.textContent;
            item.textContent = '';
            item.appendChild(textarea);
            item.classList.add('editable');
        });
  
        // Toggle buttons
        editMedBtn.style.display = 'none';
        saveMedBtn.style.display = 'inline-block';
    });
  
    saveMedBtn.addEventListener('click', () => {
        // Save new values
        document.querySelectorAll('.medical-history-value').forEach(item => {
            const textarea = item.querySelector('textarea');
            if (textarea) {
                item.textContent = textarea.value || originalMedValues[item.getAttribute('data-field')];
                item.classList.remove('editable');
            }
        });
  
        // Toggle buttons
        editMedBtn.style.display = 'inline-block';
        saveMedBtn.style.display = 'none';
        
        // Here you would typically send the data to your server
        console.log('Medical history saved:', originalMedValues);
    });
  });
  
  // Personal Details Editor
  document.addEventListener('DOMContentLoaded', () => {
    const editPersonalBtn = document.querySelector('.edit-personal-btn');
    const savePersonalBtn = document.querySelector('.save-personal-btn');
    let originalPersonalValues = {};
  
    editPersonalBtn.addEventListener('click', () => {
        // Store original values
        document.querySelectorAll('.info-section.section-1 .info-value').forEach(item => {
            const field = item.getAttribute('data-field');
            originalPersonalValues[field] = item.textContent;
            
            // Create input field
            const input = document.createElement('input');
            input.type = 'text';
            input.value = item.textContent;
            input.placeholder = `Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
            
            item.textContent = '';
            item.appendChild(input);
            item.classList.add('editable');
        });
  
        // Auto-focus first name field
        document.querySelector('[data-field="firstName"] input').focus();
        
        // Toggle buttons
        editPersonalBtn.style.display = 'none';
        savePersonalBtn.style.display = 'inline-flex';
    });
  
    savePersonalBtn.addEventListener('click', () => {
        let hasChanges = false;
        const updatedValues = {};
        
        // Save new values
        document.querySelectorAll('.info-section.section-1 .info-value').forEach(item => {
            const field = item.getAttribute('data-field');
            const input = item.querySelector('input');
            
            if (input) {
                const newValue = input.value.trim();
                item.textContent = newValue || originalPersonalValues[field];
                item.classList.remove('editable');
                
                // Track changes
                if (newValue !== originalPersonalValues[field]) {
                    hasChanges = true;
                    updatedValues[field] = newValue;
                }
            }
        });
  
        // Toggle buttons
        editPersonalBtn.style.display = 'inline-flex';
        savePersonalBtn.style.display = 'none';
        
        // Show confirmation if changes were made
        if (hasChanges) {
            // Here you would typically send updatedValues to your server
            console.log('Personal details updated:', updatedValues);
            
            // Show save confirmation
            const confirmation = document.createElement('div');
            confirmation.className = 'save-confirmation';
            confirmation.innerHTML = `
                <i class="fas fa-check-circle"></i> Changes saved
            `;
            document.querySelector('.personal-details-actions').appendChild(confirmation);
            
            setTimeout(() => {
                confirmation.style.opacity = '0';
                setTimeout(() => confirmation.remove(), 300);
            }, 2000);
        }
    });
  });
  
  
  // Emergency Contact Editor
  document.addEventListener('DOMContentLoaded', () => {
    const editEmergencyBtn = document.querySelector('.edit-emergency-btn');
    const saveEmergencyBtn = document.querySelector('.save-emergency-btn');
    let originalEmergencyValues = {};
  
    editEmergencyBtn.addEventListener('click', () => {
        // Store original values
        document.querySelectorAll('.info-section.section-5 .info-value').forEach(item => {
            const field = item.getAttribute('data-field');
            originalEmergencyValues[field] = item.textContent;
            
            // Create input field
            const input = document.createElement('input');
            input.type = field === 'emergencyPhone' ? 'tel' : 'text';
            input.value = item.textContent;
            input.placeholder = `Enter ${field.replace('emergency', '').toLowerCase()}`;
            
            item.textContent = '';
            item.appendChild(input);
            item.classList.add('editable');
        });
  
        // Toggle buttons
        editEmergencyBtn.style.display = 'none';
        saveEmergencyBtn.style.display = 'inline-flex';
    });
  
    saveEmergencyBtn.addEventListener('click', () => {
        // Save new values
        document.querySelectorAll('.info-section.section-5 .info-value').forEach(item => {
            const input = item.querySelector('input');
            if (input) {
                item.textContent = input.value || originalEmergencyValues[item.getAttribute('data-field')];
                item.classList.remove('editable');
            }
        });
  
        // Toggle buttons
        editEmergencyBtn.style.display = 'inline-flex';
        saveEmergencyBtn.style.display = 'none';
        
        // Here you would typically send the data to your server
        console.log('Emergency contact updated');
    });
  });
  
  
  
  // Medical Information Editor
  const medicalInfoEditBtn = document.querySelector('.medical-info-edit');
  const medicalInfoSaveBtn = document.querySelector('.medical-info-save');
  const bloodGroupSelect = document.querySelector('.blood-group-select');
  
  // Set initial blood group value
  bloodGroupSelect.value = 'O+'; // Set to patient's current blood group
  
  medicalInfoEditBtn.addEventListener('click', () => {
    // Make referred by field editable
    const referredByField = document.querySelector('[data-field="referredBy"]');
    const currentReferredBy = referredByField.textContent;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentReferredBy;
    input.placeholder = 'Enter referral source';
    
    referredByField.textContent = '';
    referredByField.appendChild(input);
    referredByField.classList.add('editable');
    
    // Enable blood group select
    bloodGroupSelect.style.pointerEvents = 'auto';
    bloodGroupSelect.style.opacity = '1';
    
    medicalInfoEditBtn.style.display = 'none';
    medicalInfoSaveBtn.style.display = 'inline-flex';
  });
  
  medicalInfoSaveBtn.addEventListener('click', () => {
    // Save referred by field
    const referredByField = document.querySelector('[data-field="referredBy"]');
    const input = referredByField.querySelector('input');
    
    if(input) {
        referredByField.textContent = input.value || 'Not specified';
        referredByField.classList.remove('editable');
    }
    
    // Disable blood group select
    bloodGroupSelect.style.pointerEvents = 'none';
    bloodGroupSelect.style.opacity = '0.8';
    
    medicalInfoEditBtn.style.display = 'inline-flex';
    medicalInfoSaveBtn.style.display = 'none';
    
    // Add your save logic here
    console.log('Medical information updated', {
        bloodGroup: bloodGroupSelect.value,
        referredBy: referredByField.textContent
    });
  });
  
  
  // Emergency Contact Editor
  const emergencyEditBtn = document.querySelector('.emergency-edit');
  const emergencySaveBtn = document.querySelector('.emergency-save');
  
  emergencyEditBtn.addEventListener('click', () => {
    const emergencyFields = document.querySelectorAll('.emergency-contact-section .info-value');
    
    emergencyFields.forEach(field => {
        const fieldName = field.getAttribute('data-field');
        const currentValue = field.textContent;
        
        const input = document.createElement(fieldName === 'emergencyPhone' ? 'input' : 'input');
        input.type = fieldName === 'emergencyPhone' ? 'tel' : 'text';
        input.value = currentValue;
        input.placeholder = `Enter ${fieldName.replace('emergency', '').toLowerCase()}`;
        
        if(fieldName === 'emergencyPhone') {
            input.pattern = "[+][0-9]{11,14}";
            input.title = "Format: +911234567890";
        }
        
        field.textContent = '';
        field.appendChild(input);
        field.classList.add('editable');
        
        if(fieldName === 'emergencyName') input.focus();
    });
    
    emergencyEditBtn.style.display = 'none';
    emergencySaveBtn.style.display = 'inline-flex';
  });
  
  emergencySaveBtn.addEventListener('click', () => {
    const emergencyFields = document.querySelectorAll('.emergency-contact-section .info-value');
    let isValid = true;
    
    emergencyFields.forEach(field => {
        const input = field.querySelector('input');
        if(input) {
            if(input.type === 'tel' && !input.checkValidity()) {
                input.style.borderColor = 'red';
                isValid = false;
                return;
            }
            field.textContent = input.value;
            field.classList.remove('editable');
        }
    });
    
    if(!isValid) {
        alert('Please enter a valid phone number (e.g. +918987654321)');
        return;
    }
    
    emergencyEditBtn.style.display = 'inline-flex';
    emergencySaveBtn.style.display = 'none';
    
    // Add your save logic here
    console.log('Emergency contact updated');
  });
  
  
  // Patient Photo Upload Functionality
  function initPatientPhotoUpload() {
    const photoUpload = document.createElement('input');
    photoUpload.type = 'file';
    photoUpload.id = 'patientPhotoUpload';
    photoUpload.accept = 'image/*';
    photoUpload.style.display = 'none';
    document.body.appendChild(photoUpload);
  
    const patientPhoto = document.getElementById('patientPhoto') || document.querySelector('.cardio-profile i');
    const photoContainer = document.createElement('div');
    photoContainer.className = 'patient-photo-container';
    
    // Replace the heart icon with photo container if it exists
    if (document.querySelector('.cardio-profile')) {
        const profileCircle = document.querySelector('.cardio-profile');
        profileCircle.innerHTML = '';
        profileCircle.appendChild(photoContainer);
        profileCircle.classList.add('has-photo');
    }
  
    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/100';
    img.alt = 'Patient Photo';
    img.id = 'patientPhotoImg';
    photoContainer.appendChild(img);
  
    const uploadBtn = document.createElement('button');
    uploadBtn.className = 'upload-photo-btn';
    uploadBtn.innerHTML = '<i class="fas fa-camera"></i> Add Photo';
    photoContainer.appendChild(uploadBtn);
  
    photoUpload.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                img.src = event.target.result;
                uploadBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Change';
                // Add your photo upload logic here
                console.log('Photo uploaded:', e.target.files[0].name);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });
  
    uploadBtn.addEventListener('click', () => photoUpload.click());
  }

  // Call this function after DOM loads
  document.addEventListener('DOMContentLoaded', initPatientPhotoUpload);
  document.addEventListener('DOMContentLoaded', function() {
    const editProfileBtn = document.getElementById('editProfileBtn');
    const profileContainer = document.querySelector('.profile-container');
    let isEditMode = false;

    editProfileBtn.addEventListener('click', function() {
        isEditMode = !isEditMode;
        
        if (isEditMode) {
            // Enter edit mode
            profileContainer.classList.add('edit-mode');
            editProfileBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
            
            // Make all info values editable
            document.querySelectorAll('.info-value').forEach(el => {
                const originalValue = el.textContent;
                const fieldName = el.getAttribute('data-field') || 
                                 el.parentElement.querySelector('.info-label').textContent.toLowerCase().replace(' ', '-');
                
                if (el.tagName === 'DIV' && !el.querySelector('input, select')) {
                    el.innerHTML = `<input type="text" value="${originalValue.trim()}" data-original="${originalValue}" data-field="${fieldName}">`;
                }
            });
            
            // Make medical history values editable
            document.querySelectorAll('.medical-history-value').forEach(el => {
                const originalValue = el.textContent;
                const fieldName = el.getAttribute('data-field');
                
                if (el.tagName === 'DIV' && !el.querySelector('textarea')) {
                    el.innerHTML = `<textarea data-field="${fieldName}">${originalValue.trim()}</textarea>`;
                }
            });
            
        } else {
            // Exit edit mode and save changes
            profileContainer.classList.remove('edit-mode');
            editProfileBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
            
            // Collect all changed data
            const updatedData = {};
            
            document.querySelectorAll('.info-value input, .medical-history-value textarea').forEach(input => {
                const fieldName = input.getAttribute('data-field');
                const newValue = input.value;
                updatedData[fieldName] = newValue;
                
                // Replace input with plain text
                const parent = input.parentElement;
                parent.textContent = newValue;
                parent.setAttribute('data-field', fieldName);
            });
            
            // Here you would typically send updatedData to your server
            console.log('Updated data:', updatedData);
            // Example: fetch('/api/update-profile', { method: 'POST', body: JSON.stringify(updatedData) });
            
            // Show save confirmation
            showSaveNotification();
        }
    });
    
    function showSaveNotification() {
        const notification = document.createElement('div');
        notification.className = 'save-notification';
        notification.innerHTML = '<i class="fas fa-check-circle"></i> Changes saved successfully!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const editProfileBtn = document.getElementById('editProfileBtn');
    const profileContainer = document.querySelector('.profile-container');
    let isEditMode = false;
  
    editProfileBtn.addEventListener('click', function() {
        isEditMode = !isEditMode;
        
        if (isEditMode) {
            // Enter edit mode
            profileContainer.classList.add('edit-mode');
            editProfileBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
            
            // Make all info values editable
            document.querySelectorAll('.info-value').forEach(el => {
                const originalValue = el.textContent;
                const fieldName = el.getAttribute('data-field');
                
                if (!el.querySelector('input')) {
                    el.innerHTML = `<input type="text" value="${originalValue.trim()}" data-field="${fieldName}">`;
                }
            });
            
            // Make medical history values editable
            document.querySelectorAll('.medical-history-value').forEach(el => {
                const originalValue = el.textContent;
                const fieldName = el.getAttribute('data-field');
                
                if (!el.querySelector('textarea')) {
                    el.innerHTML = `<textarea data-field="${fieldName}">${originalValue.trim()}</textarea>`;
                }
            });
            
        } else {
            // Exit edit mode and save changes
            profileContainer.classList.remove('edit-mode');
            editProfileBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
            
            // Collect all changed data
            const updatedData = {};
            
            document.querySelectorAll('.info-value input, .medical-history-value textarea').forEach(input => {
                const fieldName = input.getAttribute('data-field');
                const newValue = input.value;
                updatedData[fieldName] = newValue;
                
                // Replace input with plain text
                const parent = input.parentElement;
                parent.textContent = newValue;
                parent.setAttribute('data-field', fieldName);
            });
            
            // Show save confirmation
            showSaveNotification();
        }
    });
    
    function showSaveNotification() {
        const notification = document.createElement('div');
        notification.className = 'save-notification';
        notification.innerHTML = '<i class="fas fa-check-circle"></i> Changes saved successfully!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const editBtn = document.getElementById('editProfileBtn');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveContainer = document.getElementById('saveContainer');
    const notification = document.getElementById('saveNotification');
    const addNoteBtn = document.querySelector('.add-note-btn');
    
    // Store original values
    let originalValues = {};
    
    // Edit Button Click
    editBtn.addEventListener('click', function() {
        // Make all fields editable
        document.querySelectorAll('[data-field]').forEach(field => {
            originalValues[field.dataset.field] = field.textContent;
            field.contentEditable = true;
            field.classList.add('editable');
        });
        
        // Show save buttons
        saveContainer.style.display = 'flex';
        document.body.classList.add('edit-mode');
    });
    
    // Save Button Click
    saveBtn.addEventListener('click', function() {
        // Collect all changed data
        const updatedData = {};
        document.querySelectorAll('[data-field]').forEach(field => {
            updatedData[field.dataset.field] = field.textContent;
            field.contentEditable = false;
            field.classList.remove('editable');
        });
        
        // Hide save buttons
        saveContainer.style.display = 'none';
        document.body.classList.remove('edit-mode');
        
        // Show success notification
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
        
        // Log the changes (replace with actual save logic)
        console.log('Saved data:', updatedData);
    });
    
    // Cancel Button Click
    cancelBtn.addEventListener('click', function() {
        // Revert all changes
        document.querySelectorAll('[data-field]').forEach(field => {
            field.textContent = originalValues[field.dataset.field];
            field.contentEditable = false;
            field.classList.remove('editable');
        });
        
        // Hide save buttons
        saveContainer.style.display = 'none';
        document.body.classList.remove('edit-mode');
    });
    
    // Add Note Functionality
    if (addNoteBtn) {
        addNoteBtn.addEventListener('click', function() {
            const textarea = document.querySelector('.new-note textarea');
            const noteContent = textarea.value.trim();
            
            if (noteContent) {
                const notesSection = document.querySelector('.notes-section');
                const now = new Date();
                const dateStr = now.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                
                const newNote = document.createElement('div');
                newNote.className = 'note-item';
                newNote.innerHTML = `
                    <div class="note-content">${noteContent}</div>
                    <div class="note-date">
                        <i class="far fa-calendar-alt"></i> Added on ${dateStr}
                    </div>
                `;
                
                notesSection.prepend(newNote);
                textarea.value = '';
            }
        });
    }
     
    // FAB Button
    const fab = document.querySelector('.fab');
    if (fab) {
        fab.addEventListener('click', function() {
            alert('Quick actions menu would appear here');
        });
    }
  });
 //==================================================================================================================
  // File: assets/js/patientProfile.js

/**
 * This file handles the fetching of patient data and displaying it on the profile page
 */

// Global variable to store patient data
// let patientData = null;

// // Check if we're on the login page
// if (window.location.pathname.includes('login.html')) {
//     // Add submit event listener to the login form
//     document.addEventListener('DOMContentLoaded', function() {
//         const loginForm = document.getElementById('loginForm');
//         if (loginForm) {
//             loginForm.addEventListener('submit', handleLoginSubmit);
//         }
//     });
// }

// // Check if we're on the patient profile page
// if (window.location.pathname.includes('patientprofile.html') || window.location.pathname.endsWith('patientprofile.html')) {
//     // Load patient data when the page loads
//     document.addEventListener('DOMContentLoaded', loadPatientProfile);
// }

// /**
//  * Handles the login form submission
//  * @param {Event} event - The submit event
//  */
// function handleLoginSubmit(event) {
//     event.preventDefault();
    
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const role = document.querySelector('input[name="role"]:checked')?.value;
    
//     // Ensure we're logging in as a patient
//     if (role !== 'patient') {
//         // If not a patient login, proceed with standard login flow
//         return;
//     }
    
//     // Make API request to login endpoint
//     fetchPatientData(email, password)
//         .then(data => {
//             if (data) {
//                 // Save patient data to localStorage
//                 localStorage.setItem('patientData', JSON.stringify(data));
                
//                 // Redirect to patient profile page
//                 window.location.href = 'patient-profile.html';
//             }
//         })
//         .catch(error => {
//             console.error('Login failed:', error);
//             // Display error message to user
//             showLoginError('Login failed. Please check your credentials and try again.');
//         });
// }

// /**
//  * Makes API request to fetch patient data
//  * @param {string} email - User's email
//  * @param {string} password - User's password
//  * @returns {Promise} - Promise resolving to patient data
//  */
// function fetchPatientData(email, password) {
//     // API endpoint URL - replace with your actual API endpoint
//     const apiUrl = 'http://cardiology-department-system.runasp.net/index.html/api/Patient/Login';
    
//     // Create request payload
//     const payload = {
//         email: email,
//         password: password
//     };
    
//     // Make the API request
//     return fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Login failed');
//         }
//         return response.json();
//     });
// }

// /**
//  * Shows login error message
//  * @param {string} message - Error message to display
//  */
// function showLoginError(message) {
//     // Create error alert if it doesn't exist
//     let errorAlert = document.querySelector('.alert-danger');
//     if (!errorAlert) {
//         errorAlert = document.createElement('div');
//         errorAlert.className = 'alert alert-danger';
//         errorAlert.role = 'alert';
        
//         // Insert at the top of the form
//         const loginForm = document.getElementById('loginForm');
//         loginForm.insertBefore(errorAlert, loginForm.firstChild);
//     }
    
//     errorAlert.textContent = message;
// }

// /**
//  * Loads patient profile data from localStorage and displays it
//  */
// function loadPatientProfile() {
//     // Retrieve patient data from localStorage
//     const storedData = localStorage.getItem('patientData');
    
//     if (!storedData) {
//         // If no data found, redirect to login page
//         console.error('No patient data found');
//         window.location.href = 'login.html';
//         return;
//     }
    
//     try {
//         // Parse the stored data
//         patientData = JSON.parse(storedData);
        
//         // Update the UI with patient data
//         displayPatientData(patientData);
//     } catch (error) {
//         console.error('Error parsing patient data:', error);
//         // Handle error appropriately
//     }
// }

// /**
//  * Displays patient data in the profile page
//  * @param {Object} data - Patient data object
//  */
// function displayPatientData(data) {
//     // Update display fields with patient data
    
//     // Display name (top of profile)
//     const fullName = `${data.fName || ''} ${data.lName || ''}`.trim();
//     updateElementText('display-name', fullName || 'Patient Name');
    
//     // Personal details section
//     updateElementText('display-firstName', data.fName || '');
//     updateElementText('display-lastName', data.lName || '');
//     updateElementText('display-gender', data.gender || '');
//     updateElementText('display-dob', formatDate(data.birthDate) || '');
    
//     // Medical information
//     updateElementText('display-bloodGroup', data.bloodType || '');
//     updateElementText('display-referredBy', data.link || '');
    
//     // Family information
//     updateElementText('display-parentName', data.parentName || '');
//     updateElementText('display-spouseName', data.spouseName || '');
    
//     // Contact details
//     if (data.phoneNumbers && data.phoneNumbers.length > 0) {
//         updateElementText('display-primaryMobile', data.phoneNumbers[0] || '');
//         if (data.phoneNumbers.length > 1) {
//             updateElementText('display-secondaryMobile', data.phoneNumbers[1] || '');
//         }
//     }
//     updateElementText('display-landLine', data.landLine || '');
//     updateElementText('display-email', data.email || '');
//     updateElementText('display-streetAddress', data.address || '');
    
//     // Emergency contact
//     updateElementText('display-emergencyName', data.emergencyContactName || '');
//     updateElementText('display-emergencyPhone', data.emergencyContactPhone || '');
    
//     // Medical history
//     updateElementText('display-allergies', data.allergies || '');
//     updateElementText('display-chronic', data.chronicConditions || '');
//     updateElementText('display-surgeries', data.previousSurgeries || '');
//     updateElementText('display-medications', data.currentMedications || '');
    
//     // Health insurance
//     updateElementText('display-provider', data.insuranceProvider || '');
//     updateElementText('display-policyNumber', data.policyNumber || '');
//     updateElementText('display-validUntil', formatDate(data.policyValidDate) || '');
    
//     // Also update edit mode fields with the same data
//     populateEditFields(data);
// }

// /**
//  * Updates text content of an element if it exists
//  * @param {string} elementId - ID of the element to update
//  * @param {string} text - Text to set
//  */
// function updateElementText(elementId, text) {
//     const element = document.getElementById(elementId);
//     if (element) {
//         element.textContent = text;
//     }
// }

// /**
//  * Populates edit mode fields with patient data
//  * @param {Object} data - Patient data object
//  */
// function populateEditFields(data) {
//     // Personal details
//     setInputValue('edit-firstName', data.fName);
//     setInputValue('edit-lastName', data.lName);
//     setSelectValue('edit-gender', data.gender);
//     setInputValue('edit-dob', formatDate(data.birthDate));
    
//     // Medical information
//     setSelectValue('edit-bloodGroup', data.bloodType);
//     setInputValue('edit-referredBy', data.link);
    
//     // Family information
//     setInputValue('edit-parentName', data.parentName);
//     setInputValue('edit-spouseName', data.spouseName);
    
//     // Contact details
//     if (data.phoneNumbers && data.phoneNumbers.length > 0) {
//         setInputValue('edit-primaryMobile', data.phoneNumbers[0]);
//         if (data.phoneNumbers.length > 1) {
//             setInputValue('edit-secondaryMobile', data.phoneNumbers[1]);
//         }
//     }
//     setInputValue('edit-landLine', data.landLine);
//     setInputValue('edit-email', data.email);
//     setInputValue('edit-streetAddress', data.address);
    
//     // Emergency contact
//     setInputValue('edit-emergencyName', data.emergencyContactName);
//     setInputValue('edit-emergencyPhone', data.emergencyContactPhone);
    
//     // Medical history
//     setTextareaValue('edit-allergies', data.allergies);
//     setTextareaValue('edit-chronic', data.chronicConditions);
//     setTextareaValue('edit-surgeries', data.previousSurgeries);
//     setTextareaValue('edit-medications', data.currentMedications);
    
//     // Health insurance
//     setInputValue('edit-provider', data.insuranceProvider);
//     setInputValue('edit-policyNumber', data.policyNumber);
//     setInputValue('edit-validUntil', formatDate(data.policyValidDate));
// }

// /**
//  * Sets value of an input element if it exists
//  * @param {string} elementId - ID of the input element
//  * @param {string} value - Value to set
//  */
// function setInputValue(elementId, value) {
//     const element = document.getElementById(elementId);
//     if (element) {
//         element.value = value || '';
//     }
// }

// /**
//  * Sets value of a select element if it exists
//  * @param {string} elementId - ID of the select element
//  * @param {string} value - Value to set
//  */
// function setSelectValue(elementId, value) {
//     const element = document.getElementById(elementId);
//     if (element && value) {
//         // Find and select the matching option
//         const option = Array.from(element.options).find(opt => opt.value === value);
//         if (option) {
//             element.value = value;
//         }
//     }
// }

// /**
//  * Sets value of a textarea element if it exists
//  * @param {string} elementId - ID of the textarea element
//  * @param {string} value - Value to set
//  */
// function setTextareaValue(elementId, value) {
//     const element = document.getElementById(elementId);
//     if (element) {
//         element.value = value || '';
//     }
// }

// /**
//  * Formats a date string or object into a readable format
//  * @param {string|Date} dateInput - Date to format
//  * @returns {string} - Formatted date string
//  */
// function formatDate(dateInput) {
//     if (!dateInput) return '';
    
//     try {
//         const date = new Date(dateInput);
//         // Check if date is valid
//         if (isNaN(date.getTime())) return dateInput;
        
//         // Format as DD-MMM-YYYY
//         const options = { day: '2-digit', month: 'short', year: 'numeric' };
//         return date.toLocaleDateString('en-US', options);
//     } catch (error) {
//         console.error('Error formatting date:', error);
//         return dateInput;
//     }
// }

// /**
//  * Updates patient data via API when edit form is submitted
//  */
// document.addEventListener('DOMContentLoaded', function() {
//     const saveBtn = document.getElementById('saveBtn');
//     if (saveBtn) {
//         saveBtn.addEventListener('click', savePatientData);
//     }
// });

// /**
//  * Collects form data and sends update request to API
//  */
// function savePatientData() {
//     // Collect data from form fields
//     const updatedData = {
//         fName: getInputValue('edit-firstName'),
//         lName: getInputValue('edit-lastName'),
//         birthDate: parseDateForAPI(getInputValue('edit-dob')),
//         email: getInputValue('edit-email'),
//         bloodType: getSelectValue('edit-bloodGroup'),
//         emergencyContactName: getInputValue('edit-emergencyName'),
//         emergencyContactPhone: getInputValue('edit-emergencyPhone'),
//         phoneNumbers: [
//             getInputValue('edit-primaryMobile'),
//             getInputValue('edit-secondaryMobile')
//         ].filter(Boolean), // Remove empty values
//         gender: getSelectValue('edit-gender'),
//         link: getInputValue('edit-referredBy'),
//         parentName: getInputValue('edit-parentName'),
//         address: getInputValue('edit-streetAddress'),
//         spouseName: getInputValue('edit-spouseName'),
//         landLine: getInputValue('edit-landLine'),
//         allergies: getTextareaValue('edit-allergies'),
//         chronicConditions: getTextareaValue('edit-chronic'),
//         previousSurgeries: getTextareaValue('edit-surgeries'),
//         currentMedications: getTextareaValue('edit-medications'),
//         policyNumber: getInputValue('edit-policyNumber'),
//         insuranceProvider: getInputValue('edit-provider'),
//         policyValidDate: parseDateForAPI(getInputValue('edit-validUntil'))
//     };
    
//     // Keep the patient ID from the original data
//     if (patientData && patientData.id) {
//         updatedData.id = patientData.id;
//     }
    
//     // Send update to API
//     updatePatientData(updatedData)
//         .then(response => {
//             if (response.success) {
//                 // Update stored data
//                 patientData = updatedData;
//                 localStorage.setItem('patientData', JSON.stringify(updatedData));
                
//                 // Switch back to view mode
//                 document.getElementById('view-mode').style.display = 'block';
//                 document.getElementById('edit-mode').style.display = 'none';
                
//                 // Update the display with new data
//                 displayPatientData(updatedData);
                
//                 // Show success message
//                 showToast('Profile updated successfully');
//             } else {
//                 showToast('Failed to update profile', 'error');
//             }
//         })
//         .catch(error => {
//             console.error('Error updating profile:', error);
//             showToast('Error updating profile. Please try again.', 'error');
//         });
// }

// /**
//  * Gets value from an input element
//  * @param {string} elementId - Element ID
//  * @returns {string} - Input value
//  */
// function getInputValue(elementId) {
//     const element = document.getElementById(elementId);
//     return element ? element.value : '';
// }

// /**
//  * Gets value from a select element
//  * @param {string} elementId - Element ID
//  * @returns {string} - Selected value
//  */
// function getSelectValue(elementId) {
//     const element = document.getElementById(elementId);
//     return element ? element.value : '';
// }

// /**
//  * Gets value from a textarea element
//  * @param {string} elementId - Element ID
//  * @returns {string} - Textarea content
//  */
// function getTextareaValue(elementId) {
//     const element = document.getElementById(elementId);
//     return element ? element.value : '';
// }

// /**
//  * Parses a display date for API submission
//  * @param {string} dateStr - Date string to parse
//  * @returns {string|null} - Date in API format or null
//  */
// function parseDateForAPI(dateStr) {
//     if (!dateStr) return null;
    
//     try {
//         const date = new Date(dateStr);
//         if (isNaN(date.getTime())) return null;
        
//         // Format as YYYY-MM-DD for API
//         return date.toISOString().split('T')[0];
//     } catch (error) {
//         console.error('Error parsing date for API:', error);
//         return null;
//     }
// }

// /**
//  * Sends updated patient data to the API
//  * @param {Object} data - Updated patient data
//  * @returns {Promise} - Promise resolving to API response
//  */
// function updatePatientData(data) {
//     // API endpoint URL - replace with your actual API endpoint
//     const apiUrl = 'http://cardiology-department-system.runasp.net/index.html/api/Patient/Update';
    
//     // Make the API request
//     return fetch(apiUrl, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + localStorage.getItem('token') // If using token auth
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Update failed');
//         }
//         return response.json();
//     });
// }

// /**
//  * Shows a toast notification
//  * @param {string} message - Message to display
//  * @param {string} type - Type of toast (success, error)
//  */
// function showToast(message, type = 'success') {
//     // Check if we already have a toast container
//     let toastContainer = document.querySelector('.toast-container');
    
//     if (!toastContainer) {
//         // Create toast container
//         toastContainer = document.createElement('div');
//         toastContainer.className = 'toast-container';
//         document.body.appendChild(toastContainer);
//     }
    
//     // Create toast element
//     const toast = document.createElement('div');
//     toast.className = `toast ${type}`;
//     toast.textContent = message;
    
//     // Add to container
//     toastContainer.appendChild(toast);
    
//     // Auto remove after delay
//     setTimeout(() => {
//         toast.classList.add('hide');
//         setTimeout(() => {
//             toast.remove();
//         }, 300);
//     }, 3000);
// }
  //=======================================================================================
  // const patientId = localStorage.getItem("PatientId");
  
  // if (patientId) {
    //   fetch(`http://cardiology-department-system.runasp.net/api/Patient/${patientId}`)
    //     .then(res => res.json())
    //     .then(data => {
        //       document.getElementById('display-firstName').textContent = data.fName;
        
        //     })
        //     .catch(err => {
            //       console.error("Error loading profile:", err);
            //     });
            // } else {
                //   alert("Patient ID not found. Please log in again.");
                //   window.location.href = "login.html";
                // }
                
//=======================================================================================
document.addEventListener("DOMContentLoaded", () => {
    const email = localStorage.getItem("patientEmail"); // or patientId
    if (!email) {
      alert("No patient email found. Please log in.");
      return;
    }
    
    console.log("Fetching data for email:", email); // Debug log
    
    // Function to fetch and populate data
    fetch(`http://cardiology-department-system.runasp.net/api/Patient/Profile}`, {
      method: "GET",
      credentials: "include", // if using cookie auth
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log("Response status:", response.status); // Debug log
        // Check if response is ok (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse JSON response
      })
      .then(data => {
        console.log("Data received:", data); // Debug log
        
        // Personal Details
        document.getElementById("display-name").textContent = data.firstName + " " + (data.lastName || "");
        document.getElementById("display-patientId").textContent = data.patientId || "";
        document.getElementById("display-firstName").textContent = data.firstName || "";
        document.getElementById("display-lastName").textContent = data.lastName || "";
        document.getElementById("display-gender").textContent = data.gender || "";
        document.getElementById("display-dob").textContent = data.dateOfBirth || "";
  
        // Medical Information
        document.getElementById("display-bloodGroup").textContent = data.bloodGroup || "";
        document.getElementById("display-referredBy").textContent = data.referredBy || "";
  
        // Family Information
        document.getElementById("display-parentName").textContent = data.parentName || "";
        document.getElementById("display-spouseName").textContent = data.spouseName || "";
  
        // Contact Details
        document.getElementById("display-primaryMobile").textContent = data.primaryMobile || "";
        document.getElementById("display-secondaryMobile").textContent = data.secondaryMobile || "";
        document.getElementById("display-landLine").textContent = data.landLine || "";
        document.getElementById("display-email").textContent = data.email || "";
        document.getElementById("display-streetAddress").textContent = data.streetAddress || "";
  
        // Emergency Contact
        document.getElementById("display-emergencyName").textContent = data.emergencyContactName || "";
        document.getElementById("display-emergencyPhone").textContent = data.emergencyContactPhone || "";
  
        // Medical History
        document.getElementById("display-allergies").textContent = data.allergies || "";
        document.getElementById("display-chronic").textContent = data.chronicConditions || "";
        document.getElementById("display-surgeries").textContent = data.previousSurgeries || "";
        document.getElementById("display-medications").textContent = data.currentMedications || "";
  
        // Health Insurance
        document.getElementById("display-provider").textContent = data.insuranceProvider || "";
        document.getElementById("display-policyNumber").textContent = data.policyNumber || "";
        document.getElementById("display-validUntil").textContent = data.policyValidUntil || "";
  
        // Notes (Array)
        const notesDisplay = document.getElementById("notes-display");
        if (notesDisplay) {
          notesDisplay.innerHTML = ""; // Clear existing
          if (data.notes && Array.isArray(data.notes)) {
            data.notes.forEach(note => {
              const noteDiv = document.createElement("div");
              noteDiv.textContent = note;
              notesDisplay.appendChild(noteDiv);
            });
          }
        } else {
          console.warn("Notes display element not found");
        }
        
        console.log("Data populated successfully");
      })
      .catch(error => {
        console.error("Failed to fetch patient data:", error);
        alert("Error loading patient data: " + error.message);
        
        // Optional: Add error message to the page itself
        const errorContainer = document.createElement("div");
        errorContainer.className = "error-message";
        errorContainer.style.color = "red";
        errorContainer.style.padding = "10px";
        errorContainer.style.margin = "10px 0";
        errorContainer.textContent = "Failed to load patient data: " + error.message;
        document.body.prepend(errorContainer);
      });
  });