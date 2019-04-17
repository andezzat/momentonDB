import { pipe } from '../helpers/index.js';


const getEmployeesWithNoManager = employees => employees.filter(([, employee]) => !employee.managerId);
const getUnderlings = employees => id => employees.filter(([, employee]) => employee.managerId === id);

const getNodes = allEmployees => employees => employees.reduce((arr, [id, { name }]) => [...arr, {
  id,
  label: name,
  children: pipe(
    getUnderlings(allEmployees),
    getNodes(allEmployees),
  )(id),
}], []);

const getHierarchy = allEmployees => pipe(
  getEmployeesWithNoManager,
  getNodes(allEmployees),
)(allEmployees);

const validate = map => (employee) => {
  if (map.get(employee.id)) throw new Error(`Employee with id ${employee.id} already exists`);
  if (employee.managerId && !Array.from(map).find(([id]) => id === employee.managerId)) throw new Error(`There's no manager with id ${employee.managerId}`);
  return employee;
};
const addToMap = map => ({ id, name, managerId }) => map.set(id, { name, managerId });


const Employee = (map = new Map()) => ({
  map,
  create: pipe(
    validate(map),
    addToMap(map),
  ),
  find: id => ({
    id,
    ...map.get(id),
  }),
  getHierarchy: () => getHierarchy(Array.from(map)),
});


export default Employee;
