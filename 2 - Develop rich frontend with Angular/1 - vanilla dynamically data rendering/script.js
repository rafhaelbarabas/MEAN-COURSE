const employeeList = document.getElementById("employee-list");
const tableContainer = document.getElementById("table-container");

const addNewEmployee = async (employeeData) => {
  try {
    const headers = {
      "Content-type": "application/json",
    };

    const response = await fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(employeeData),
    });
    const data = await response.json();
    alert(`Employee: ${data.name} added`);
  } catch (error) {
    console.error("Something went wrong...");
    console.error(error);
  } finally {
    fetchEmployees();
  }
};

const fetchEmployees = async () => {
  try {
    const response = await fetch("http://localhost:3000/employees");
    const employees = await response.json();
    console.log(employees);
    displayEmployees(employees);
    generateTable(employees);
  } catch (error) {
    console.error("Something went wrong...");
  }
};

const displayEmployees = (employees) => {
  employeeList.innerHTML = "";
  employees.forEach((employee) => {
    const li = document.createElement("li");
    li.textContent = `${employee.name} - ${employee.position}`;
    employeeList.appendChild(li);
  });
};

const generateTable = (employees) => {
  const currentTable = tableContainer.firstElementChild;
  console.log(currentTable);
  if (currentTable) {
    tableContainer.removeChild(currentTable);
  }

  const employeeTable = document.createElement("table");
  employeeTable.id = "employee-table";

  const headers = ["ID", "Name", "Position"];
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  employeeTable.appendChild(thead);

  const tbody = document.createElement("tbody");

  employees.forEach((employee) => {
    const row = document.createElement("tr");
    const colId = document.createElement("td");
    const colName = document.createElement("td");
    const colPosition = document.createElement("td");

    colId.textContent = employee.id;
    colName.textContent = employee.name;
    colPosition.textContent = employee.position;

    row.appendChild(colId);
    row.appendChild(colName);
    row.appendChild(colPosition);

    tbody.appendChild(row);
  });

  employeeTable.appendChild(tbody);
};

fetchEmployees();
// addNewEmployee({ id: 10, name: "Mr Crowley", position: "Manager" });
