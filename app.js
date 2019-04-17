import { Employee } from './database/index.js';



const initDB = () => {
  window.myEmployees = Employee();
  window.myEmployees.create({
    id: 150,
    name: 'Jamie',
  });
  
  window.myEmployees.create({
    id: 400,
    name: 'Steve',
    managerId: 150,
  });
  window.myEmployees.create({
    id: 100,
    name: 'Alan',
    managerId: 150,
  });

  window.myEmployees.create({
    id: 220,
    name: 'Martin',
    managerId: 100,
  });
  window.myEmployees.create({
    id: 2201,
    name: 'Martin',
    managerId: 1001,
  });
  window.myEmployees.create({
    id: 275,
    name: 'Alex',
    managerId: 100,
  });
  window.myEmployees.create({
    id: 190,
    name: 'David',
    managerId: 400,
  });
};

const initVue = () => {
  Vue.component('treeselect', VueTreeselect.Treeselect);

  window.myVueApp = new Vue({
    el: '#app',
    data: {
      selectedEmployeeId: null,
      employeeHierarchy: window.myEmployees.getHierarchy(),
    },
    computed: {
      selectedEmployee() {
        return this.selectedEmployeeId
          ? window.myEmployees.find(this.selectedEmployeeId)
          : null;
      },
    },
  });
};


const main = () => {
  initDB();
  initVue();
};


main();
