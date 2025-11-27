import { test } from "@playwright/test";
import { TasksPage } from "./pages/tasks.page";
import { TASK_CASES } from "./data/tasks.data";

test.describe("TASKS - DESKTOP", () => {
  test.beforeEach(async ({ page }) => {
    const tasks = new TasksPage(page);
    await tasks.navigateToTasks();
  });

  test("add task", async ({ page }) => {
    const tasks = new TasksPage(page);
    const text = TASK_CASES.ADD.text;
    await tasks.addTask(text);
    await tasks.expectTaskVisibleDesktop(1, text);
    await tasks.expectPriorityDesktop(1, 1);
  });

  test("add empty task", async ({ page }) => {
    const tasks = new TasksPage(page);
    const spaces = TASK_CASES.EMPTY;
    await tasks.clickSubmit();
    await tasks.fillTaskInput(spaces.empty);
  });

  test("edit task", async ({ page }) => {
    const tasks = new TasksPage(page);
  });

  test("cancel edit", async ({ page }) => {
    const tasks = new TasksPage(page);
  });

  test("complete task", async ({ page }) => {
    const tasks = new TasksPage(page);
  });

  test("sequence ids", async ({ page }) => {
    const tasks = new TasksPage(page);
  });

  test("reorder drag & drop", async ({ page }) => {
    const tasks = new TasksPage(page);
  });
});
