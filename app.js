const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby02k1YLMbqjPYI22dob2ZLcAL7dS__pC6tOdIDwn86r9WZBBu9jvyNkeW0g9rIt3lZ/exec";

// Fallback baseline data so UI never starts completely blank
const BASELINE_GUESTS = [
  // Mom side
  { name: "Mahi", probability: "High chance", group: "Mom side" },
  { name: "Moha", probability: "High chance", group: "Mom side" },
  { name: "Rit", probability: "High chance", group: "Mom side" },
  { name: "Riya", probability: "High chance", group: "Mom side" },
  { name: "Tutu Aita", probability: "High chance", group: "Mom side" },
  { name: "Momi mahi", probability: "High chance", group: "Mom side" },
  { name: "Mala mahi", probability: "High chance", group: "Mom side" },
  { name: "Bubul moha", probability: "High chance", group: "Mom side" },
  { name: "Rish", probability: "Maybe", group: "Mom side" },
  { name: "Rish's sister", probability: "High chance", group: "Mom side" },
  { name: "Papu dada", probability: "High chance", group: "Mom side" },
  { name: "Papu dada wife", probability: "High chance", group: "Mom side" },
  { name: "Usnob dada", probability: "Maybe", group: "Mom side" },
  { name: "Usnob's wife", probability: "Maybe", group: "Mom side" },
  { name: "Bhai dada", probability: "Low chance", group: "Mom side" },
  { name: "Babanu", probability: "Maybe", group: "Mom side" },
  { name: "Babanu mother", probability: "Maybe", group: "Mom side" },
  { name: "Ponchi ba", probability: "Low chance", group: "Mom side" },
  { name: "Ponchi ba husband", probability: "Low chance", group: "Mom side" },
  { name: "Friend 1", probability: "High chance", group: "Mom side" },
  { name: "Friend 2", probability: "High chance", group: "Mom side" },
  { name: "Friend 3", probability: "High chance", group: "Mom side" },
  { name: "Friend 4", probability: "High chance", group: "Mom side" },
  // Dad side
  { name: "Ranu pehi", probability: "High chance", group: "Dad side" },
  { name: "Ranu peha", probability: "High chance", group: "Dad side" },
  { name: "Chirag", probability: "Maybe", group: "Dad side" },
  { name: "Nikita", probability: "Maybe", group: "Dad side" },
  { name: "Moina jetia", probability: "High chance", group: "Dad side" },
  { name: "Maina ba", probability: "Maybe", group: "Dad side" },
  { name: "Maina ba husband", probability: "Maybe", group: "Dad side" },
  { name: "Dhubri dada", probability: "High chance", group: "Dad side" },
  { name: "Duhubri dada wife", probability: "High chance", group: "Dad side" },
  { name: "Dhubri dada daughter", probability: "High chance", group: "Dad side" },
  { name: "Raju khura", probability: "High chance", group: "Dad side" },
  { name: "Khuri", probability: "High chance", group: "Dad side" },
  { name: "Bumon", probability: "High chance", group: "Dad side" },
  { name: "Barasha ba", probability: "Low chance", group: "Dad side" },
  { name: "Barasha ba husband", probability: "Low chance", group: "Dad side" },
  { name: "Barasha ba daughter", probability: "Low chance", group: "Dad side" },
  // Abhinab side
  { name: "Soujanya", probability: "High chance", group: "Abhinab side" },
  { name: "Abhishek", probability: "High chance", group: "Abhinab side" },
  { name: "Soujanya sister", probability: "High chance", group: "Abhinab side" },
  { name: "Soujany's bhindo", probability: "High chance", group: "Abhinab side" },
  { name: "Abhishek's sister 1", probability: "High chance", group: "Abhinab side" },
  { name: "Abhishek's sister 2", probability: "High chance", group: "Abhinab side" },
  { name: "Abhishek's bhindo", probability: "High chance", group: "Abhinab side" },
  { name: "Dhiraj", probability: "High chance", group: "Abhinab side" },
  { name: "Rohan", probability: "High chance", group: "Abhinab side" },
  { name: "Amar", probability: "High chance", group: "Abhinab side" },
  { name: "Sourav", probability: "High chance", group: "Abhinab side" },
  { name: "Patna", probability: "Low chance", group: "Abhinab side" },
  { name: "Sonu", probability: "Low chance", group: "Abhinab side" },
  { name: "Abhijit", probability: "Maybe", group: "Abhinab side" },
  { name: "Sid", probability: "Low chance", group: "Abhinab side" },
  { name: "Rupam", probability: "Maybe", group: "Abhinab side" },
  { name: "Gitashree", probability: "Low chance", group: "Abhinab side" },
  { name: "Ayush", probability: "High chance", group: "Abhinab side" },
  { name: "Debashree", probability: "Maybe", group: "Abhinab side" },
  { name: "Sonali", probability: "High chance", group: "Abhinab side" },
  { name: "Subro", probability: "High chance", group: "Abhinab side" },
  { name: "Nilutpal", probability: "Maybe", group: "Abhinab side" },
  { name: "Suraj", probability: "Maybe", group: "Abhinab side" },
  { name: "Tuku", probability: "High chance", group: "Abhinab side" },
  { name: "Vasu", probability: "High chance", group: "Abhinab side" },
  { name: "Vasudha", probability: "Maybe", group: "Abhinab side" },
  { name: "Gomes", probability: "High chance", group: "Abhinab side" },
  { name: "Monish da", probability: "Low chance", group: "Abhinab side" },
  { name: "Debu", probability: "High chance", group: "Abhinab side" },
  // Babli side
  { name: "Bhupali", probability: "High chance", group: "Babli side" },
  { name: "Friend 1 (Babli)", probability: "Maybe", group: "Babli side" },
  { name: "Friend 2 (Babli)", probability: "Maybe", group: "Babli side" },
  { name: "Friend 3 (Babli)", probability: "Low chance", group: "Babli side" }
];

let guests = JSON.parse(JSON.stringify(BASELINE_GUESTS));
let rooms = [];
let currentFilterGroup = "All";
let currentFilterProb = "All";

let probChart = null;
let groupChart = null;
let capacityChart = null;

window.addEventListener("DOMContentLoaded", () => {
  renderGroupButtons();
  renderAll();
  fetchLiveData();
});

/**
 * Fetch without custom headers so CORS preflight is not triggered
 */
async function fetchLiveData() {
  const dot = document.getElementById("syncDot");
  const text = document.getElementById("syncText");
  const refreshIcon = document.getElementById("refreshIcon");

  if (refreshIcon) refreshIcon.classList.add("fa-spin");
  if (dot) dot.className = "w-2 h-2 rounded-full bg-amber-400 animate-pulse";
  if (text) text.innerText = "Syncing from Sheet...";

  try {
    const url = `${APPS_SCRIPT_URL}?t=${Date.now()}`;
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow"
    });
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    if (data.status === "success") {
      if (data.guests && data.guests.length > 0) {
        guests = data.guests;
      }
      if (data.rooms && data.rooms.length > 0) {
        rooms = data.rooms;
      }

      if (dot) dot.className = "w-2 h-2 rounded-full bg-emerald-400";
      if (text) text.innerText = `Synced with Google Sheet (${guests.length} guests)`;
      renderGroupButtons();
      renderAll();
    }
  } catch (err) {
    console.warn("Sheet fetch blocked or offline. Falling back to local state:", err);
    if (dot) dot.className = "w-2 h-2 rounded-full bg-amber-500";
    if (text) text.innerText = `Local Data Active (${guests.length} guests)`;
  } finally {
    if (refreshIcon) refreshIcon.classList.remove("fa-spin");
  }
}

/**
 * Clean POST call without preflight headers
 */
async function sendPostToSheet(payload) {
  const dot = document.getElementById("syncDot");
  const text = document.getElementById("syncText");
  if (dot) dot.className = "w-2 h-2 rounded-full bg-amber-400 animate-pulse";
  if (text) text.innerText = "Saving to Google Sheet...";

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    if (dot) dot.className = "w-2 h-2 rounded-full bg-emerald-400";
    if (text) text.innerText = "Saved to Google Sheet";
  } catch (e) {
    console.error("Save error:", e);
    if (dot) dot.className = "w-2 h-2 rounded-full bg-rose-500";
    if (text) text.innerText = "Saved locally (Sheet offline)";
  }
}

function renderGroupButtons() {
  const container = document.getElementById("groupFilterContainer");
  if (!container) return;

  const groupSet = new Set(["All"]);
  guests.forEach(g => { if (g.group) groupSet.add(g.group); });

  container.innerHTML = `<span class="text-slate-400 text-[11px] uppercase mr-1">Side:</span>`;
  groupSet.forEach(grp => {
    const count = grp === "All" ? guests.length : guests.filter(x => x.group === grp).length;
    const btn = document.createElement("button");
    btn.onclick = () => setFilterGroup(grp);
    btn.className = `group-btn px-3 py-1 rounded-lg transition ${grp === currentFilterGroup ? 'bg-amber-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`;
    btn.dataset.group = grp;
    btn.innerText = `${grp} (${count})`;
    container.appendChild(btn);
  });
}

function renderAll() {
  updateKPIs();
  renderCharts();
  renderTable();
  renderRooms();
}

function updateKPIs() {
  const total = guests.length;
  const high = guests.filter(g => (g.probability || "").toLowerCase().includes("high")).length;
  const maybe = guests.filter(g => (g.probability || "").toLowerCase().includes("maybe")).length;
  const low = guests.filter(g => (g.probability || "").toLowerCase().includes("low")).length;
  const forecast = Math.round((high * 0.95) + (maybe * 0.50) + (low * 0.20));

  const sTotal = document.getElementById("statTotal");
  const sHigh = document.getElementById("statHigh");
  const sMaybe = document.getElementById("statMaybe");
  const sLow = document.getElementById("statLow");
  const sForecast = document.getElementById("statForecast");

  if (sTotal) sTotal.innerText = total;
  if (sHigh) sHigh.innerText = high;
  if (sMaybe) sMaybe.innerText = maybe;
  if (sLow) sLow.innerText = low;
  if (sForecast) sForecast.innerText = forecast;
}

function renderCharts() {
  const high = guests.filter(g => (g.probability || "").toLowerCase().includes("high")).length;
  const maybe = guests.filter(g => (g.probability || "").toLowerCase().includes("maybe")).length;
  const low = guests.filter(g => (g.probability || "").toLowerCase().includes("low")).length;

  const pEl = document.getElementById("probChart");
  if (pEl) {
    const pCtx = pEl.getContext("2d");
    if (probChart) probChart.destroy();
    probChart = new Chart(pCtx, {
      type: 'doughnut',
      data: {
        labels: ['High Chance', 'Maybe', 'Low Chance'],
        datasets: [{
          data: [high, maybe, low],
          backgroundColor: ['#10b981', '#f59e0b', '#f43f5e'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } }
      }
    });
  }

  const gEl = document.getElementById("groupChart");
  if (gEl) {
    const groupCounts = {};
    guests.forEach(g => {
      const grp = g.group || 'Other';
      groupCounts[grp] = (groupCounts[grp] || 0) + 1;
    });

    const gCtx = gEl.getContext("2d");
    if (groupChart) groupChart.destroy();
    groupChart = new Chart(gCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(groupCounts),
        datasets: [{
          data: Object.values(groupCounts),
          backgroundColor: ['#8b5cf6', '#3b82f6', '#d97706', '#ec4899', '#06b6d4'],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
      }
    });
  }

  const cEl = document.getElementById("capacityChart");
  if (cEl) {
    const totalBeds = rooms.reduce((sum, r) => sum + (r.capacity || 0), 0) || 30;
    const forecast = Math.round((high * 0.95) + (maybe * 0.50) + (low * 0.20));

    const cCtx = cEl.getContext("2d");
    if (capacityChart) capacityChart.destroy();
    capacityChart = new Chart(cCtx, {
      type: 'bar',
      data: {
        labels: ['Total Beds', 'High Only', 'Forecast', 'Total List'],
        datasets: [{
          data: [totalBeds, high, forecast, guests.length],
          backgroundColor: ['#0284c7', '#10b981', '#7c3aed', '#e11d48'],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}

function renderTable() {
  const searchInput = document.getElementById("searchInput");
  const search = searchInput ? searchInput.value.toLowerCase() : "";
  const tbody = document.getElementById("guestTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  const filtered = guests.filter(g => {
    const nameMatch = (g.name || "").toLowerCase().includes(search);
    const grp = (g.group || "").toLowerCase();
    const matchesGroup = (currentFilterGroup === 'All') || (grp === currentFilterGroup.toLowerCase());
    const prob = (g.probability || "").toLowerCase();
    const matchesProb = (currentFilterProb === 'All') || (prob === currentFilterProb.toLowerCase());
    return nameMatch && matchesGroup && matchesProb;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-center py-6 text-slate-400 text-xs">No guests found.</td></tr>`;
    return;
  }

  filtered.forEach(g => {
    let badgeColor = "bg-slate-100 text-slate-700";
    const prob = (g.probability || "").toLowerCase();
    if (prob.includes("high")) badgeColor = "bg-emerald-50 text-emerald-700 border border-emerald-200";
    else if (prob.includes("maybe")) badgeColor = "bg-amber-50 text-amber-700 border border-amber-200";
    else if (prob.includes("low")) badgeColor = "bg-rose-50 text-rose-700 border border-rose-200";

    const tr = document.createElement("tr");
    tr.className = "bg-slate-50/60 hover:bg-amber-50/50 transition rounded-xl";
    tr.innerHTML = `
      <td class="py-2.5 px-3 font-semibold text-slate-800 text-xs sm:text-sm">${g.name}</td>
      <td class="py-2.5 px-3 text-xs text-slate-500 font-medium">${g.group}</td>
      <td class="py-2.5 px-3">
        <select onchange="updateGuestChance('${g.name}', this.value)" class="text-xs font-semibold px-2.5 py-1 rounded-lg ${badgeColor} cursor-pointer focus:outline-none shadow-sm">
          <option value="High chance" ${prob.includes("high") ? "selected" : ""}>High chance</option>
          <option value="Maybe" ${prob.includes("maybe") ? "selected" : ""}>Maybe</option>
          <option value="Low chance" ${prob.includes("low") ? "selected" : ""}>Low chance</option>
        </select>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderRooms() {
  const container = document.getElementById("roomCardsContainer");
  if (!container) return;
  container.innerHTML = "";

  const totalBeds = rooms.reduce((sum, r) => sum + (r.capacity || 0), 0);
  const totalAssigned = rooms.reduce((sum, r) => sum + (r.assigned ? r.assigned.length : 0), 0);
  const summaryEl = document.getElementById("roomCapacitySummary");
  if (summaryEl) {
    summaryEl.innerText = `${totalAssigned} of ${totalBeds || 30} Beds Occupied`;
  }

  if (rooms.length === 0) {
    container.innerHTML = `<div class="p-6 text-center text-xs text-slate-400">Loading hotel rooms from Sheet2...</div>`;
    return;
  }

  rooms.forEach((r, idx) => {
    const assignedList = r.assigned || [];
    const isFull = assignedList.length >= r.capacity;

    const card = document.createElement("div");
    card.className = `p-4 rounded-xl border transition ${isFull ? 'bg-slate-50/80 border-slate-200' : 'bg-white border-amber-100 shadow-sm'}`;
    card.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-amber-700">${r.hotel}</span>
          <h4 class="font-bold text-slate-800 text-xs sm:text-sm">${r.name}</h4>
        </div>
        <span class="text-xs font-bold px-2 py-0.5 rounded-full ${isFull ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}">
          ${assignedList.length} / ${r.capacity} Beds
        </span>
      </div>

      <div class="flex flex-wrap items-center gap-1.5 mt-2 min-h-[30px]">
        ${assignedList.map((guestName, gIdx) => `
          <span class="inline-flex items-center gap-1.5 text-xs bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md border border-slate-200">
            ${guestName}
            <button onclick="removeGuestFromRoom(${idx}, ${gIdx})" class="text-slate-400 hover:text-rose-600"><i class="fa-solid fa-xmark text-[10px]"></i></button>
          </span>
        `).join('')}

        ${!isFull ? `
          <select onchange="assignGuestToRoom(${idx}, this.value); this.value='';" class="text-xs bg-slate-50 border border-dashed border-slate-300 text-slate-500 rounded-md px-2 py-1 focus:outline-none">
            <option value="">+ Assign Guest</option>
            ${guests.filter(g => !isGuestAssigned(g.name)).map(g => `<option value="${g.name}">${g.name} (${g.probability})</option>`).join('')}
          </select>
        ` : ''}
      </div>
    `;
    container.appendChild(card);
  });
}

function isGuestAssigned(name) {
  return rooms.some(r => r.assigned && r.assigned.includes(name));
}

async function assignGuestToRoom(roomIdx, guestName) {
  if (!guestName) return;
  const room = rooms[roomIdx];
  if (!room.assigned) room.assigned = [];

  if (room.assigned.length < room.capacity) {
    room.assigned.push(guestName);
    renderRooms();

    await sendPostToSheet({
      action: "SAVE_ROOM_ASSIGNMENT",
      rowIndex: room.rowIndex,
      assigned: room.assigned
    });
  }
}

async function removeGuestFromRoom(roomIdx, guestIdx) {
  const room = rooms[roomIdx];
  room.assigned.splice(guestIdx, 1);
  renderRooms();

  await sendPostToSheet({
    action: "SAVE_ROOM_ASSIGNMENT",
    rowIndex: room.rowIndex,
    assigned: room.assigned
  });
}

async function updateGuestChance(name, newProb) {
  const g = guests.find(item => item.name === name);
  if (g) {
    g.probability = newProb;
    renderAll();

    await sendPostToSheet({
      action: "UPDATE_PROBABILITY",
      name: name,
      probability: newProb
    });
  }
}

async function handleAddGuest(e) {
  e.preventDefault();
  const name = document.getElementById("modalGuestName").value.trim();
  const group = document.getElementById("modalGuestGroup").value;
  const prob = document.getElementById("modalGuestProb").value;

  if (!name) return;

  guests.push({ name, group, probability: prob });
  renderGroupButtons();
  renderAll();
  closeModal();

  await sendPostToSheet({
    action: "ADD_GUEST",
    name: name,
    group: group,
    probability: prob
  });

  document.getElementById("addGuestForm").reset();
}

function setFilterGroup(group) {
  currentFilterGroup = group;
  document.querySelectorAll('.group-btn').forEach(b => {
    b.classList.remove('bg-amber-900', 'text-white', 'shadow-sm');
    b.classList.add('bg-slate-100', 'text-slate-700');
    if (b.dataset.group === group) {
      b.classList.remove('bg-slate-100', 'text-slate-700');
      b.classList.add('bg-amber-900', 'text-white', 'shadow-sm');
    }
  });
  renderTable();
}

function setFilterProb(prob) {
  currentFilterProb = prob;
  document.querySelectorAll('.prob-btn').forEach(b => {
    b.classList.remove('bg-slate-800', 'text-white');
    if (b.dataset.prob === prob) {
      b.classList.add('bg-slate-800', 'text-white');
    }
  });
  renderTable();
}

function openModal() { document.getElementById("addModal").classList.remove("hidden"); }
function closeModal() { document.getElementById("addModal").classList.add("hidden"); }
