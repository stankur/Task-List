import task from "./task";
import { isEqual, parse } from "date-fns";

it("initiializes with the right given value", () => {
	const testDate1 = parse("2021-09-03", "yyyy-MM-dd", new Date());
	const testTask1 = task("have lunch", testDate1, false);

	expect(testTask1.name).toBe("have lunch");
	expect(isEqual(testTask1.date, testDate1)).toBe(true);
	expect(testTask1.isChecked).toBe(false);

	const testDate2 = parse("2021-09-04", "yyyy-MM-dd", new Date());
	const testTask2 = task("poop", testDate2, true);

	expect(testTask2.name).toBe("poop");
	expect(isEqual(testTask2.date, testDate2)).toBe(true);
	expect(testTask2.isChecked).toBe(true);
});

it("could change name", () => {
	const testDate1 = parse("2021-09-03", "yyyy-MM-dd", new Date());
	const testTask1 = task("have lunch", testDate1, false);

	expect(testTask1.name).toBe("have lunch");

	const changedNameTask1 = testTask1.changeName("have lunch");
	expect(changedNameTask1.name).toBe("have lunch");

	const changedNameTask2 = changedNameTask1.changeName("spongbob");
	expect(changedNameTask2.name).toBe("spongbob");
});

it("could change date", () => {
	const testDate1 = parse("2021-09-03", "yyyy-MM-dd", new Date());
	const testTask1 = task("have lunch", testDate1, false);

	expect(isEqual(testTask1.date, testDate1)).toBe(true);

	const newDate1 = parse("2020-10-02", "yyyy-MM-dd", new Date());
	const changedDateTask1 = testTask1.changeDate(newDate1);

	expect(isEqual(changedDateTask1.date, newDate1)).toBe(true);
});

it("could toggle check", () => {
	const testDate1 = parse("2021-09-03", "yyyy-MM-dd", new Date());
	const initiallyUnCheckedTask = task("have lunch", testDate1, false);

	expect(initiallyUnCheckedTask.isChecked).toBe(false);

	const checkedtask = initiallyUnCheckedTask.toggleCheck();
	expect(checkedtask.isChecked).toBe(true);

	const testDate2 = parse("2020-03-04", "yyyy-MM-dd", new Date());
	const initiallyCheckedTask = task("cry", testDate2, true);

	expect(initiallyCheckedTask.isChecked).toBe(true);

	const unCheckedTask = initiallyCheckedTask.toggleCheck();

	expect(unCheckedTask.isChecked).toBe(false);
});

it("could check if it is the same as other tasks", () => {
	const testDate1 = parse("2021-09-03", "yyyy-MM-dd", new Date());
	const testTask1 = task("have lunch", testDate1, false);

	const dummyDifferentDate1 = parse("2021-06-03", "yyyy-MM-dd", new Date());

	expect(
		testTask1.hasSameNameAndDateAs("have lunch", dummyDifferentDate1)
	).toBe(false);
	expect(testTask1.hasSameNameAndDateAs("have brunch", testDate1)).toBe(
		false
	);
	expect(testTask1.hasSameNameAndDateAs("have lunch", testDate1)).toBe(true);
});
