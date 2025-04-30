
(function ($) {
  "use strict";

  // Stick Sidebar

  if ($(window).width() > 767) {
    if ($(".theiaStickySidebar").length > 0) {
      $(".theiaStickySidebar").theiaStickySidebar({
        // Settings
        additionalMarginTop: 30,
      });
    }
  }

  // Sidebar
  if ($(window).width() <= 991) {
    var Sidemenu = function () {
      this.$menuItem = $(".main-nav a");
    };

    function init() {
      var $this = Sidemenu;
      $(".main-nav a").on("click", function (e) {
        if ($(this).parent().hasClass("has-submenu")) {
          e.preventDefault();
        }
        if (!$(this).hasClass("submenu")) {
          $("ul", $(this).parents("ul:first")).slideUp(350);
          $("a", $(this).parents("ul:first")).removeClass("submenu");
          $(this).next("ul").slideDown(350);
          $(this).addClass("submenu");
        } else if ($(this).hasClass("submenu")) {
          $(this).removeClass("submenu");
          $(this).next("ul").slideUp(350);
        }
      });
      //$('.main-nav li.has-submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
    }

    // Sidebar Initiate
    init();
  }

  // Textarea Text Count

  var maxLength = 100;
  $("#review_desc").on("keyup change", function () {
    var length = $(this).val().length;
    length = maxLength - length;
    $("#chars").text(length);
  });

  // Select 2

  if ($(".select").length > 0) {
    $(".select").select2({
      minimumResultsForSearch: -1,
      width: "100%",
    });
  }

  // Date Time Picker

  if ($(".datetimepicker").length > 0) {
    $(".datetimepicker").datetimepicker({
      format: "DD/MM/YYYY",
      icons: {
        up: "fas fa-chevron-up",
        down: "fas fa-chevron-down",
        next: "fas fa-chevron-right",
        previous: "fas fa-chevron-left",
      },
    });
  }

  // Fancybox Gallery

  if ($(".clinic-gallery a").length > 0) {
    $(".clinic-gallery a").fancybox({
      buttons: ["thumbs", "close"],
    });
  }

  // Floating Label

  if ($(".floating").length > 0) {
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  // Mobile menu sidebar overlay

  $("body").append('<div class="sidebar-overlay"></div>');
  $(document).on("click", "#mobile_btn", function () {
    $("main-wrapper").toggleClass("slide-nav");
    $(".sidebar-overlay").toggleClass("opened");
    $("html").addClass("menu-opened");
    return false;
  });

  $(document).on("click", ".sidebar-overlay", function () {
    $("html").removeClass("menu-opened");
    $(this).removeClass("opened");
    $("main-wrapper").removeClass("slide-nav");
  });

  $(document).on("click", "#menu_close", function () {
    $("html").removeClass("menu-opened");
    $(".sidebar-overlay").removeClass("opened");
    $("main-wrapper").removeClass("slide-nav");
  });

  // Mobile Menu

  // if($(window).width() <= 991){
  // 	mobileSidebar();
  // } else {
  // 	$('html').removeClass('menu-opened');
  // }

  /*function mobileSidebar() {
		$('.main-nav a').on('click', function(e) {
			$('.dropdown-menu').each(function() {
			  if($(this).hasClass('show')) {
				  $(this).slideUp(350);
			  }
			});
			if(!$(this).next('.dropdown-menu').hasClass('show')) {
				$(this).next('.dropdown-menu').slideDown(350);
			}
			
		});
	}*/



 // Tooltip

  if ($('[data-toggle="tooltip"]').length > 0) {
    $('[data-toggle="tooltip"]').tooltip();
  }

  // Add More Hours

  $(".hours-info").on("click", ".trash", function () {
    $(this).closest(".hours-cont").remove();
    return false;
  });

  $(".add-hours").on("click", function () {
    var hourscontent =
      '<div class="row form-row hours-cont">' +
      '<div class="col-12 col-md-10">' +
      '<div class="row form-row">' +
      '<div class="col-12 col-md-6">' +
      '<div class="form-group">' +
      "<label>Start Time</label>" +
      '<select class="form-control">' +
      "<option>-</option>" +
      "<option>12.00 am</option>" +
      "<option>12.30 am</option>" +
      "<option>1.00 am</option>" +
      "<option>1.30 am</option>" +
      "</select>" +
      "</div>" +
      "</div>" +
      '<div class="col-12 col-md-6">' +
      '<div class="form-group">' +
      "<label>End Time</label>" +
      '<select class="form-control">' +
      "<option>-</option>" +
      "<option>12.00 am</option>" +
      "<option>12.30 am</option>" +
      "<option>1.00 am</option>" +
      "<option>1.30 am</option>" +
      "</select>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="col-12 col-md-2"><label class="d-md-block d-sm-none d-none">&nbsp;</label><a href="#" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a></div>' +
      "</div>";

    $(".hours-info").append(hourscontent);
    return false;
  });

  // Content div min height set

  function resizeInnerDiv() {
    var height = $(window).height();
    var header_height = $(".header").height();
    var footer_height = $(".footer").height();
    var setheight = height - header_height;
    var trueheight = setheight - footer_height;
    $(".content").css("min-height", trueheight);
  }

  if ($(".content").length > 0) {
    resizeInnerDiv();
  }

  $(window).resize(function () {
    if ($(".content").length > 0) {
      resizeInnerDiv();
    }
    /*if($(window).width() <= 991){
			mobileSidebar();
		} else {
			$('html').removeClass('menu-opened');
		}*/
  });

  // Slick Slider

  if ($(".specialities-slider").length > 0) {
    $(".specialities-slider").slick({
      dots: true,
      autoplay: false,
      infinite: true,
      variableWidth: true,
      prevArrow: false,
      nextArrow: false,
    });
  }

  if ($(".doctor-slider").length > 0) {
    $(".doctor-slider").slick({
      dots: false,
      autoplay: false,
      infinite: true,
      variableWidth: true,
    });
  }
  if ($(".features-slider").length > 0) {
    $(".features-slider").slick({
      dots: true,
      infinite: true,
      centerMode: true,
      slidesToShow: 3,
      speed: 500,
      variableWidth: true,
      arrows: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  // Date Time Picker

  if ($(".datepicker").length > 0) {
    $(".datepicker").datetimepicker({
      viewMode: "years",
      showTodayButton: true,
      format: "DD-MM-YYYY",
      // minDate:new Date(),
      widgetPositioning: {
        horizontal: "auto",
        vertical: "bottom",
      },
    });
  }

  // Chat

  var chatAppTarget = $(".chat-window");
  (function () {
    if ($(window).width() > 991) chatAppTarget.removeClass("chat-slide");

    $(document).on(
      "click",
      ".chat-window .chat-users-list a.media",
      function () {
        if ($(window).width() <= 991) {
          chatAppTarget.addClass("chat-slide");
        }
        return false;
      }
    );
    $(document).on("click", "#back_user_list", function () {
      if ($(window).width() <= 991) {
        chatAppTarget.removeClass("chat-slide");
      }
      return false;
    });
  })();

  // Circle Progress Bar

  function animateElements() {
    $(".circle-bar1").each(function () {
      var elementPos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var percent = $(this).find(".circle-graph1").attr("data-percent");
      var animate = $(this).data("animate");
      if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
        $(this).data("animate", true);
        $(this)
          .find(".circle-graph1")
          .circleProgress({
            value: percent / 100,
            size: 400,
            thickness: 30,
            fill: {
              color: "#da3f81",
            },
          });
      }
    });
    $(".circle-bar2").each(function () {
      var elementPos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var percent = $(this).find(".circle-graph2").attr("data-percent");
      var animate = $(this).data("animate");
      if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
        $(this).data("animate", true);
        $(this)
          .find(".circle-graph2")
          .circleProgress({
            value: percent / 100,
            size: 400,
            thickness: 30,
            fill: {
              color: "#68dda9",
            },
          });
      }
    });
    $(".circle-bar3").each(function () {
      var elementPos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var percent = $(this).find(".circle-graph3").attr("data-percent");
      var animate = $(this).data("animate");
      if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
        $(this).data("animate", true);
        $(this)
          .find(".circle-graph3")
          .circleProgress({
            value: percent / 100,
            size: 400,
            thickness: 30,
            fill: {
              color: "#1b5a90",
            },
          });
      }
    });
  }

  if ($(".circle-bar").length > 0) {
    animateElements();
  }
  $(window).scroll(animateElements);
})(jQuery);

// ======================================

async function fetchData() {
  try {
    const pokemonName = document
      .querySelector("form-control")
      .value.toLowerCase();
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }
    console.log("Done");
    const data = await response.json();
    const pokemonSprite = data.sprites.front_default;
    // const imgElement = document.getElementById("pokemonSprite");

    // imgElement.src = pokemonSprite;
    // imgElement.style.display = "block";
  } catch (error) {
    console.error(error);
  }
}
//=======================================================================
//patient profile// Create dynamic bubbles
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




