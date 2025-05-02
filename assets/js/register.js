// Patient Registration Form Handler with specific 405 Method Not Allowed handling
document.addEventListener('DOMContentLoaded', function() {
    // Get form references
    const patientForm = document.getElementById('patient-registration');
    const photoInput = document.getElementById('photo-input');
    const patientPhoto = document.getElementById('patient-photo');
    
    // Handle photo upload preview
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                patientPhoto.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Handle form submission
    patientForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = patientForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Clear previous error messages
        const errorContainer = document.getElementById('error-container');
        if (errorContainer) {
            errorContainer.innerHTML = '';
        }
        
        try {
            // Collect form data
            const formData = new FormData(patientForm);
            
            // Prepare API request payload
            const payload = {
                fName: formData.get('firstName'),
                lName: formData.get('lastName'),
                birthDate: new Date(formData.get('dob')).toISOString(),
                password: formData.get('password'), // This would normally come from a password field
                email: formData.get('email'),
                photoPath: null, // Will be updated after file upload if needed
                bloodType: formData.get('bloodGroup'),
                emergencyContactName: formData.get('emergencyContactName'),
                emergencyContactPhone: formData.get('emergencyContactPhone'),
                phoneNumbers: [
                    formData.get('primaryMobile'),
                    formData.get('secondaryMobile') || null
                ].filter(Boolean),
                gender: formData.get('gender'),
                link: formData.get('referredBy') || "Direct",
                parentName: formData.get('parentName') || "",
                address: formData.get('address'),
                spouseName: formData.get('spouseName') || null,
                landLine: formData.get('landline') || null,
                allergies: formData.get('allergies') || null,
                chronicConditions: formData.get('chronicConditions') || null,
                previousSurgeries: formData.get('surgeries') || null,
                currentMedications: formData.get('medications') || null,
                policyNumber: formData.get('policyNumber') || null,
                insuranceProvider: formData.get('insuranceProvider') || null,
                policyValidDate: formData.get('policyValidUntil') ? new Date(formData.get('policyValidUntil')).toISOString() : null
            };
    
            // Validate the payload based on API requirements
            const validationErrors = validatePatientData(payload);
            
            if (validationErrors.length > 0) {
                // Show validation errors
                displayError('Please correct the following errors:\n' + validationErrors.join('\n'));
                return;
            }
            
            // Handle photo upload if provided
            const photoFile = photoInput.files[0];
            if (photoFile) {
                payload.photoPath = 'uploads/' + photoFile.name;
            }
            
            // Make API call to register the patient
            const response = await fetch('https://cardiology-department-system.runasp.net/api/Patient/register', {
                method: 'POST', // Make sure this matches what the server expects
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            // Handle specific 405 Method Not Allowed error
            if (response.status === 405) {
                // Log information for debugging
                console.error('Method Not Allowed error. Server does not allow POST to this endpoint.');
                
                // Try to get more details from response headers
                const allowHeader = response.headers.get('Allow');
                let methodNotAllowedMsg = 'Registration failed: The server does not support this operation.';
                
                if (allowHeader) {
                    methodNotAllowedMsg += ` Allowed methods are: ${allowHeader}.`;
                    console.info('Allowed methods:', allowHeader);
                    
                    // If GET is allowed, we might be using the wrong endpoint
                    if (allowHeader.includes('GET') && !allowHeader.includes('POST')) {
                        methodNotAllowedMsg += ' This might be a read-only endpoint.';
                    }
                }
                
                // Check if we're potentially using the wrong API URL
                if (window.location.hostname.includes('dev') || 
                    window.location.hostname.includes('staging') || 
                    window.location.hostname.includes('test')) {
                    methodNotAllowedMsg += ' Note: You appear to be on a non-production environment which may have different API configurations.';
                }
                
                throw new Error(methodNotAllowedMsg);
            }
            
            // Handle other error responses
            if (!response.ok) {
                let errorMessage = 'Registration failed';
                
                // Safely try to parse error response as JSON
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (jsonError) {
                    // If JSON parsing fails, try to get text or use status text
                    try {
                        const textError = await response.text();
                        errorMessage = textError || `Registration failed: ${response.statusText}`;
                    } catch (textError) {
                        errorMessage = `Registration failed with status: ${response.status}`;
                    }
                }
                
                throw new Error(errorMessage);
            }
            
            // Safely parse the successful response
            let responseData;
            try {
                responseData = await response.json();
            } catch (jsonError) {
                console.warn('Could not parse success response as JSON:', jsonError);
                // Continue with the flow even if we couldn't parse the response
            }
            
            // Handle successful registration
            alert('Registration successful! You can now log in to your account.');
            window.location.href = 'login.html'; // Redirect to login page
            
        } catch (error) {
            // Handle error
            console.error('Registration error:', error);
            displayError(error.message || 'Unknown error occurred during registration');
            
            // Provide recovery guidance for 405 errors
            if (error.message && error.message.includes('Method Not Allowed')) {
                // Add additional guidance
                const additionalHelp = document.createElement('div');
                additionalHelp.className = 'alert alert-info mt-3';
                additionalHelp.innerHTML = `
                    <h5>Troubleshooting Tips:</h5>
                    <ul>
                        <li>This appears to be an API configuration issue.</li>
                        <li>Please contact IT support and mention "405 Method Not Allowed" error.</li>
                        <li>If you're a developer, check that the endpoint URL and HTTP method (POST) are correct.</li>
                    </ul>
                `;
                
                if (errorContainer) {
                    errorContainer.appendChild(additionalHelp);
                }
                
                // Try with fallback endpoint if available
                if (window.appConfig && window.appConfig.apiBackupEndpoint) {
                    const fallbackNotice = document.createElement('div');
                    fallbackNotice.className = 'alert alert-warning mt-3';
                    fallbackNotice.innerHTML = 'Attempting to use backup registration service...';
                    
                    if (errorContainer) {
                        errorContainer.appendChild(fallbackNotice);
                    }
                    
                    // In a real app, you might implement retry logic with a fallback endpoint
                    // This is just a placeholder for the concept
                    console.log('Would try fallback endpoint:', window.appConfig.apiBackupEndpoint);
                }
            }
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
    
    document.querySelectorAll('.role-option').forEach(option => {
        option.addEventListener('click', () => {
          const role = option.getAttribute('data-role');
          if (role === 'patient') {
            window.location.href = 'register.html'; // replace with your patient page URL
          } else if (role === 'doctor') {
            window.location.href = 'doctor.html'; // replace with your doctor page URL
          }
        });
      });
    
    // Helper function to display errors consistently
    function displayError(message) {
        // Find error container if it exists
        const errorContainer = document.getElementById('error-container');
        if (errorContainer) {
            errorContainer.innerHTML = `<div class="alert alert-danger">${message}</div>`;
            errorContainer.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Fallback to alert
            alert(message);
        }
    }
});

// Validation function based on API schema requirements
function validatePatientData(data) {
    const errors = [];
    
    // Name validation
    if (!data.fName || data.fName.length < 2 || data.fName.length > 50) {
        errors.push('First name must be between 2 and 50 characters');
    }
    
    if (!data.lName || data.lName.length < 2 || data.lName.length > 50) {
        errors.push('Last name must be between 2 and 50 characters');
    }
    
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Password validation (in a real app, you'd get this from a password field)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    if (!data.password || !passwordRegex.test(data.password)) {
        errors.push('Password must be at least 8 characters and include uppercase, lowercase, number, and special character');
    }
    
    // Phone validation - assuming Egyptian phone format as in API
    const phoneRegex = /^(?:\+20|0)?1[0125]\d{8}$/;
    if (!data.phoneNumbers || data.phoneNumbers.length === 0) {
        errors.push('At least one phone number is required');
    } else if (!phoneRegex.test(data.phoneNumbers[0])) {
        errors.push('Please enter a valid primary phone number');
    }
    
    // Emergency contact validation
    if (!data.emergencyContactName || data.emergencyContactName.length < 2) {
        errors.push('Emergency contact name is required');
    }
    
    if (!data.emergencyContactPhone || !phoneRegex.test(data.emergencyContactPhone)) {
        errors.push('Please enter a valid emergency contact phone number');
    }
    
    // Check for other required fields
    if (!data.gender) errors.push('Gender is required');
    if (!data.address) errors.push('Address is required');
    if (!data.parentName) errors.push('Parent name is required');
    if (!data.link) errors.push('Referral information is required');
    
    // Blood type validation if provided
    if (data.bloodType) {
        const bloodTypeRegex = /^(A|B|AB|O)[+-]$/;
        if (!bloodTypeRegex.test(data.bloodType)) {
            errors.push('Please select a valid blood type');
        }
    }
    
    return errors;
}

// For demo purposes only - in a real app, you would collect this from the user
function generatePassword() {
    // This is just a placeholder - you would have password fields in your form
    return 'Temporary1!';
}
