// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track attendance
let count = 0;
const maxCount = 50; // Set a realistic attendance goal
let attendeesList = [];

// Function to update the attendee list on the page
function updateAttendeeList() {
  const attendeesListElement = document.getElementById("attendeesList");
  attendeesListElement.innerHTML = "";
  for (let i = 0; i < attendeesList.length; i++) {
    const attendee = attendeesList[i];
    const listItem = document.createElement("li");
    listItem.textContent = attendee.name + " - " + attendee.team;
    attendeesListElement.appendChild(listItem);
  }
}

// Function to create confetti animation
function createConfetti() {
  const colors = ["#0071c5", "#ffd700", "#ff6b6b", "#00d4aa", "#ff9500"];
  const confettiPieces = 50;

  for (let i = 0; i < confettiPieces; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-10px";
    confetti.style.borderRadius = "50%";
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "9999";
    document.body.appendChild(confetti);

    const duration = 2 + Math.random() * 1;
    const delay = Math.random() * 0.2;
    const xMovement = (Math.random() - 0.5) * 200;

    confetti.animate(
      [
        {
          transform: `translateY(0) translateX(0) rotate(0deg)`,
          opacity: 1,
        },
        {
          transform: `translateY(${window.innerHeight + 20}px) translateX(${xMovement}px) rotate(720deg)`,
          opacity: 0,
        },
      ],
      {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    );

    setTimeout(
      function () {
        confetti.remove();
      },
      (duration + delay) * 1000,
    );
  }
}

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.options[teamSelect.selectedIndex].text;

  console.log(name, teamName);

  // increment count
  count++;
  console.log("total check-ins", count);

  // update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.log(`progress: ${percentage}`);
  document.getElementById("progressBar").style.width = percentage;

  // update attendee count
  document.getElementById("attendeeCount").textContent = count;

  // update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // add attendee to list
  attendeesList.push({
    name: name,
    team: teamName,
  });
  updateAttendeeList();

  // show welcome message
  const message = `🎉 Welcome, ${name} from ${teamName}!`;
  const greetingElement = document.getElementById("greeting");
  greetingElement.textContent = message;
  greetingElement.style.display = "block";
  console.log(message);

  // check if attendance goal is reached
  if (count === maxCount) {
    // find the team with the most attendees
    const waterCount = parseInt(
      document.getElementById("waterCount").textContent,
    );
    const zeroCount = parseInt(
      document.getElementById("zeroCount").textContent,
    );
    const powerCount = parseInt(
      document.getElementById("powerCount").textContent,
    );

    let winningTeam = "water";
    let maxTeamCount = waterCount;

    if (zeroCount > maxTeamCount) {
      winningTeam = "zero";
      maxTeamCount = zeroCount;
    }
    if (powerCount > maxTeamCount) {
      winningTeam = "power";
      maxTeamCount = powerCount;
    }

    // show celebration message
    const celebrationMessage = `🎉 Attendance goal reached! Congratulations to ${teamSelect.options[teamSelect.selectedIndex === 1 ? 1 : teamSelect.selectedIndex === 2 ? 2 : 3].text}!`;
    greetingElement.textContent = celebrationMessage;
    greetingElement.style.backgroundColor = "#00bbff";
    greetingElement.style.color = "#003c71";

    // highlight the winning team
    document.querySelectorAll(".team-card").forEach(function (card) {
      card.classList.remove("winner");
    });
    document.querySelector(".team-card." + winningTeam).classList.add("winner");

    // trigger confetti
    createConfetti();
  }

  form.reset();
});
