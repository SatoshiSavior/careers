function fetchJobs() {
    return fetch('./jobs.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching job data:', error);
      });
  }
  
  function displayJobs(jobs) {
    const jobList = document.getElementById('job-list');
  
    jobs.forEach(job => {
      const jobCard = document.createElement('div');
      jobCard.classList.add('job-card');
  
      const jobTitle = document.createElement('h2');
      jobTitle.textContent = job.title;
  
      const jobLocation = document.createElement('p');
      jobLocation.textContent = job.location;
  
      const jobRequirements = document.createElement('ul');
      job.requirements.forEach(req => {
        const requirement = document.createElement('li');
        requirement.textContent = req;
        jobRequirements.appendChild(requirement);
      });
  
      const applyButton = document.createElement('a');
      applyButton.href = job.link;
      applyButton.textContent = 'Apply Now';
      applyButton.classList.add('button');
  
      jobCard.appendChild(jobTitle);
      jobCard.appendChild(jobLocation);
      jobCard.appendChild(jobRequirements);
      jobCard.appendChild(applyButton);
  
      jobList.appendChild(jobCard);
    });
  }
  
  function handleError(error) {
    console.error('Error occurred:', error);
  }
  
  function logMessage(message) {
    const jobList = document.getElementById('job-list');
    const log = document.createElement('p');
    log.textContent = message;
    jobList.appendChild(log);
  }
  
  // Load jobs on page load
  document.addEventListener('DOMContentLoaded', () => {
    logMessage('Page loaded');
    fetchJobs()
      .then(jobs => {
        if (jobs) {
          displayJobs(jobs);
        } else {
          handleError('No job data received');
        }
      })
      .catch(handleError);
  });
  