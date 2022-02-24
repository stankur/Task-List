import tasksList from "./tasksList";
import { parse, isEqual } from "date-fns";

it("could add new tasks properly", () => {
	const testTasksList = tasksList([]);

	const testDate1 = parse("2021-09-03", "yyyy-MM-dd", new Date());
	const testDate2 = parse("2021-08-02", "yyyy-MM-dd", new Date());

	expect(testTasksList.tasksListTasks.length).toBe(0);

	const newTasksList1 = testTasksList.addTask("new task 1", testDate1, false);

	expect(newTasksList1.tasksListTasks.length).toBe(1);
	expect(newTasksList1.tasksListTasks[0].name).toBe("new task 1");
	expect(isEqual(newTasksList1.tasksListTasks[0].date, testDate1)).toBe(true);

	const newTasksList2 = newTasksList1.addTask("new task 2", testDate2, true);

	expect(newTasksList2.tasksListTasks.length).toBe(2);
	expect(newTasksList2.tasksListTasks[0].name).toBe("new task 1");
	expect(isEqual(newTasksList2.tasksListTasks[0].date, testDate1)).toBe(true);
	expect(newTasksList2.tasksListTasks[1].name).toBe("new task 2");
	expect(isEqual(newTasksList2.tasksListTasks[1].date, testDate2)).toBe(true);
});

it("doesn't add task is a task with same name and same date has already existed", () => {
	const testTasksList = tasksList([]);

	const testDate = parse("2021-09-03", "yyyy-MM-dd", new Date());

	const newTasksList1 = testTasksList.addTask("new task", testDate, false);

	expect(newTasksList1.tasksListTasks.length).toBe(1);
	expect(newTasksList1.tasksListTasks[0].name).toBe("new task");
	expect(isEqual(newTasksList1.tasksListTasks[0].date, testDate)).toBe(true);

	const newTasksList2 = newTasksList1.addTask("new task", testDate, true);

	expect(newTasksList2.tasksListTasks.length).toBe(1);
	expect(newTasksList2.tasksListTasks[0].name).toBe("new task");
	expect(isEqual(newTasksList2.tasksListTasks[0].date, testDate)).toBe(true);
});

it("could remove existing tasks properly", () => {
	const testTasksList = tasksList([]);

	const testDate1 = parse("2021-09-03", "yyyy-MM-dd", new Date());
	const testDate2 = parse("2021-08-02", "yyyy-MM-dd", new Date());

	const newTasksList1 = testTasksList
		.addTask("new task 1", testDate1, false)
		.addTask("new task 2", testDate2, true);

	expect(newTasksList1.tasksListTasks.length).toBe(2);

	const removedTaskTasksList1 = newTasksList1.removeTask(
		"new task 1",
		testDate1
	);

	expect(removedTaskTasksList1.tasksListTasks.length).toBe(1);
	expect(removedTaskTasksList1.tasksListTasks[0].name).toBe("new task 2");
	expect(
		isEqual(removedTaskTasksList1.tasksListTasks[0].date, testDate2)
	).toBe(true);

	const removedTaskTasksList2 = removedTaskTasksList1.removeTask(
		"new task 2",
		testDate2
	);

	expect(removedTaskTasksList2.tasksListTasks.length).toBe(0);
});

it("doesn't do anything if task requested to be remove don't exist", () => {
	const testTasksList = tasksList([]);

	const testDate1 = parse("2021-09-03", "yyyy-MM-dd", new Date());
	const testDate2 = parse("2021-08-02", "yyyy-MM-dd", new Date());

	const newTasksList1 = testTasksList
		.addTask("new task 1", testDate1, false)
		.addTask("new task 2", testDate2, true);

	expect(newTasksList1.tasksListTasks.length).toBe(2);

	const removedTaskTasksList1 = newTasksList1.removeTask(
		"new task 3",
		testDate1
	);

	expect(removedTaskTasksList1.tasksListTasks.length).toBe(2);

	const removedTaskTasksList2 = removedTaskTasksList1.removeTask(
		"new task 1",
		testDate2
	);

	expect(removedTaskTasksList2.tasksListTasks.length).toBe(2);
});

it("could change edit a task's name and date if the given name and date haven't exist", () => {
	const testTasksList = tasksList([]);

	const testDate1 = parse("2021-09-03", "yyyy-MM-dd", new Date());
	const testDate2 = parse("2021-08-02", "yyyy-MM-dd", new Date());
	const testDate3 = parse("2021-08-05", "yyyy-MM-dd", new Date());

	const newTasksList1 = testTasksList
		.addTask("new task 1", testDate1, false)
		.addTask("new task 2", testDate2, true);

	const editedTaskList1 = newTasksList1.editTask(
		"new task 1",
		testDate1,
		"new task 3",
		testDate1
	);

	expect(editedTaskList1.tasksListTasks[0].name).toBe("new task 3");
	expect(isEqual(editedTaskList1.tasksListTasks[0].date, testDate1)).toBe(
		true
	);
	expect(editedTaskList1.tasksListTasks[0].isChecked).toBe(false);

	const editedTaskList2 = editedTaskList1.editTask(
		"new task 3",
		testDate1,
		"new task 3",
		testDate3
	);

	expect(editedTaskList2.tasksListTasks[0].name).toBe("new task 3");
	expect(isEqual(editedTaskList2.tasksListTasks[0].date, testDate3)).toBe(
		true
	);
	expect(editedTaskList2.tasksListTasks[0].isChecked).toBe(false);
});

it("does not edit if given name and given date alreasy exists", () => {
	const testTasksList = tasksList([]);

	const testDate1 = parse("2021-09-03", "yyyy-MM-dd", new Date());
	const testDate2 = parse("2021-08-02", "yyyy-MM-dd", new Date());

	const newTasksList1 = testTasksList
		.addTask("new task 1", testDate1, false)
		.addTask("new task 2", testDate2, true);

	const editedTasksList1 = newTasksList1.editTask(
		"new task 1",
		testDate1,
		"new task 2",
		testDate2
	);

	expect(editedTasksList1.tasksListTasks[0].name).toBe("new task 1");
	expect(isEqual(editedTasksList1.tasksListTasks[0].date, testDate1)).toBe(
		true
	);
	expect(editedTasksList1.tasksListTasks[1].name).toBe("new task 2");
	expect(isEqual(editedTasksList1.tasksListTasks[1].date, testDate2)).toBe(
		true
	);
});

it("could toggle check state of tasks", () => {
	const testTasksList = tasksList([]);

	const testDate1 = parse("2021-09-03", "yyyy-MM-dd", new Date());
	const testDate2 = parse("2021-08-02", "yyyy-MM-dd", new Date());

	const newTasksList1 = testTasksList
		.addTask("new task 1", testDate1, false)
		.addTask("new task 2", testDate2, true);

	const toggledTasksList1 = newTasksList1.toggleCheck(
		"new task 1",
		testDate1
	);

	expect(toggledTasksList1.tasksListTasks[0].isChecked).toBe(true);
	expect(toggledTasksList1.tasksListTasks[1].isChecked).toBe(true);

	const toggledTasksList2 = toggledTasksList1.toggleCheck(
		"new task 2",
		testDate2
	);

	expect(toggledTasksList2.tasksListTasks[0].isChecked).toBe(true);
	expect(toggledTasksList2.tasksListTasks[1].isChecked).toBe(false);
});
