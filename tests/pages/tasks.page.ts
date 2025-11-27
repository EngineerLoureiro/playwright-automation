import { expect, Locator, Page, test } from "@playwright/test";

/**
 * Page Object Model for the /tasks page.
 * This class exposes:
 * - navigation helpers
 * - actions (add, edit, complete, reorder)
 * - assertions (expect...)
 */
export class TasksPage {
  page: Page;
  root: Locator;
  title: Locator;
  taskInput: Locator;
  submitButton: Locator;
  constructor(page: Page) {
    this.page = page;

    // ===== Fixed locators =====
    this.root = page.getByTestId("task-page");
    this.title = page.getByTestId("task-title");
    this.taskInput = page.getByTestId("task-input");
    this.submitButton = page.getByTestId("task-submit-button");
  }

  // ===== Dynamic locators (by ID) =====

  todoItem(id: number) {
    return this.page.getByTestId(`todo-item-${id}`);
  }

  // DESKTOP locators

  todoTextDesktop(id: number) {
    return this.page.getByTestId(`todo-item-text-desktop-${id}`);
  }

  todoPriorityDesktop(id: number) {
    return this.page.getByTestId(`todo-item-priority-desktop-${id}`);
  }

  todoEditInputDesktop(id: number) {
    return this.page.getByTestId(`todo-item-edit-input-desktop-${id}`);
  }

  todoSaveButtonDesktop(id: number) {
    return this.page.getByTestId(`todo-item-save-button-desktop-${id}`);
  }

  todoCancelButtonDesktop(id: number) {
    return this.page.getByTestId(`todo-item-cancel-button-desktop-${id}`);
  }

  todoCompleteButtonDesktop(id: number) {
    return this.page.getByTestId(`todo-item-complete-button-desktop-${id}`);
  }

  // MOBILE locators

  todoTextMobile(id: number) {
    return this.page.getByTestId(`todo-item-text-mobile-${id}`);
  }

  todoPriorityMobile(id: number) {
    return this.page.getByTestId(`todo-item-priority-mobile-${id}`);
  }

  todoEditInputMobile(id: number) {
    return this.page.getByTestId(`todo-item-edit-input-mobile-${id}`);
  }

  todoEditButtonMobile(id: number) {
    return this.page.getByTestId(`todo-item-edit-button-mobile-${id}`);
  }

  todoSaveButtonMobile(id: number) {
    return this.page.getByTestId(`todo-item-save-button-mobile-${id}`);
  }

  todoCancelButtonMobile(id: number) {
    return this.page.getByTestId(`todo-item-cancel-button-mobile-${id}`);
  }

  todoCompleteButtonMobile(id: number) {
    return this.page.getByTestId(`todo-item-complete-button-mobile-${id}`);
  }

  // COMPLETED list (shared)

  completedItem(id: number) {
    return this.page.getByTestId(`completed-task-${id}`);
  }

  completedText(id: number) {
    return this.page.getByTestId(`completed-task-text-${id}`);
  }

  // ===== Dynamic collections =====

  allTodoItems() {
    return this.page.getByTestId(/^todo-item-/);
  }

  firstTodoItem() {
    return this.allTodoItems().first();
  }

  firstTodoItemTextDesktop() {
    return this.firstTodoItem().getByTestId(/^todo-item-text-desktop-/);
  }

  firstTodoItemTextMobile() {
    return this.firstTodoItem().getByTestId(/^todo-item-text-mobile-/);
  }

  // ===== Navigation =====

  /**
   * Navigate to the /tasks page and validate it is loaded.
   */
  async navigateToTasks() {
    await test.step("Navigate to /tasks page", async () => {
      await this.page.goto("/tasks");
      await expect(this.root).toBeVisible();
      await expect(this.title).toHaveText("To do list");
    });
  }

  // ===== Generic actions =====

  /**
   * Fill the task input with a given text (does not submit).
   * @param {string} text - Text to be typed in the task input.
   */
  async fillTaskInput(text: string) {
    await test.step(`Fill task input with text: "${text}"`, async () => {
      await this.taskInput.fill(text);
    });
  }

  /**
   * Click the "Add" button to submit the form.
   */
  async clickSubmit() {
    await test.step('Click on "Add" task button', async () => {
      await this.submitButton.click();
    });
  }

  /**
   * Create a new task by typing in the input and clicking "Add".
   * @param {string} text - Task description to create.
   */
  async addTask(text: string) {
    await test.step(`Add new task with text: "${text}"`, async () => {
      await this.fillTaskInput(text);
      await this.clickSubmit();
    });
  }

  // ===== Desktop Assertions =====

  /**
   * Assert that a desktop task with a given id is visible and has the expected text.
   */
  async expectTaskVisibleDesktop(id: number, text: string) {
    await test.step(`Assert desktop task #${id} is visible with text "${text}"`, async () => {
      await expect(this.todoItem(id)).toBeVisible();
      await expect(this.todoTextDesktop(id)).toHaveText(text);
    });
  }

  /**
   * Assert that the desktop task has the expected priority value.
   */
  async expectPriorityDesktop(id: number, priority: number) {
    await test.step(`Assert desktop task #${id} has priority "${priority}"`, async () => {
      await expect(this.todoPriorityDesktop(id)).toHaveText(String(priority));
    });
  }

  /**
   * Assert that the first task in the desktop list has the expected text.
   */
  async expectFirstDesktopTaskText(text: string) {
    await test.step(`Assert first desktop task in the list has text "${text}"`, async () => {
      await expect(this.firstTodoItemTextDesktop()).toHaveText(text);
    });
  }

  // ===== Mobile Assertions =====

  /**
   * Assert that a mobile task with a given id is visible and has the expected text.
   */
  async expectTaskVisibleMobile(id: number, text: string) {
    await test.step(`Assert mobile task #${id} is visible with text "${text}"`, async () => {
      await expect(this.todoItem(id)).toBeVisible();
      await expect(this.todoTextMobile(id)).toHaveText(text);
    });
  }

  /**
   * Assert that the mobile task has the expected priority label: "Priority: X".
   */
  async expectPriorityMobile(id: number, priority: number) {
    await test.step(`Assert mobile task #${id} has priority "Priority: ${priority}"`, async () => {
      await expect(this.todoPriorityMobile(id)).toHaveText(
        `Priority: ${priority}`
      );
    });
  }

  /**
   * Assert that the first task in the mobile list has the expected text.
   */
  async expectFirstMobileTaskText(text: string) {
    await test.step(`Assert first mobile task in the list has text "${text}"`, async () => {
      await expect(this.firstTodoItemTextMobile()).toHaveText(text);
    });
  }

  // ===== Shared Assertions =====

  /**
   * Assert that there are no tasks in the main list.
   */
  async expectNoTasks() {
    await test.step("Assert there are no tasks in the list", async () => {
      await expect(this.allTodoItems()).toHaveCount(0);
    });
  }

  /**
   * Assert that a given task id is not present in the main list.
   */
  async expectTaskNotVisible(id: number) {
    await test.step(`Assert task #${id} is not visible in the list`, async () => {
      await expect(this.todoItem(id)).toHaveCount(0);
    });
  }

  /**
   * Assert that a completed task exists in the completed list with the expected text.
   */
  async expectTaskInCompleted(id: number, text: string) {
    await test.step(`Assert completed task #${id} is visible with text "${text}"`, async () => {
      await expect(this.completedItem(id)).toBeVisible();
      await expect(this.completedText(id)).toHaveText(text);
    });
  }

  // ===== Desktop Editing =====

  /**
   * Start editing a task on desktop by double-clicking its text.
   * Expects that the edit input becomes visible.
   * @param {number} id - Task id to be edited (the numeric task.id, not index).
   */
  async startEditDesktop(id: number) {
    await test.step(`Start desktop edit mode for task #${id}`, async () => {
      await this.todoTextDesktop(id).click({ clickCount: 2 });
      await expect(this.todoEditInputDesktop(id)).toBeVisible();
    });
  }

  /**
   * Edit a task on desktop:
   *  - enters edit mode (double-click)
   *  - fills the new text
   *  - clicks on Save.
   * @param {number} id - Task id to be edited.
   * @param {string} newText - New description to replace the old one.
   */
  async editTaskDesktop(id: number, newText: string) {
    await test.step(`Edit desktop task #${id} and set text to "${newText}"`, async () => {
      await this.startEditDesktop(id);
      await this.todoEditInputDesktop(id).fill(newText);
      await this.todoSaveButtonDesktop(id).click();
    });
  }

  /**
   * Edit a task on desktop and then cancel the changes:
   *  - enters edit mode
   *  - fills a temporary text
   *  - clicks Cancel (original text should remain).
   * @param {number} id - Task id to be edited.
   * @param {string} tempText - Temporary text used before canceling.
   */
  async cancelEditDesktop(id: number, tempText: string) {
    await test.step(`Start desktop edit for task #${id}, type "${tempText}" and cancel`, async () => {
      await this.startEditDesktop(id);
      await this.todoEditInputDesktop(id).fill(tempText);
      await this.todoCancelButtonDesktop(id).click();
    });
  }

  // ===== Mobile Editing =====

  /**
   * Start editing a task on mobile by clicking the "Edit" button.
   * Expects that the edit input becomes visible.
   * @param {number} id - Task id to be edited.
   */
  async startEditMobile(id: number) {
    await test.step(`Start mobile edit mode for task #${id}`, async () => {
      await this.todoEditButtonMobile(id).click();
      await expect(this.todoEditInputMobile(id)).toBeVisible();
    });
  }

  /**
   * Edit a task on mobile:
   *  - clicks the Edit button
   *  - fills the new text
   *  - clicks Save.
   * @param {number} id - Task id to be edited.
   * @param {string} newText - New description to replace the old one.
   */
  async editTaskMobile(id: number, newText: string) {
    await test.step(`Edit mobile task #${id} and set text to "${newText}"`, async () => {
      await this.startEditMobile(id);
      await this.todoEditInputMobile(id).fill(newText);
      await this.todoSaveButtonMobile(id).click();
    });
  }

  /**
   * Edit a task on mobile and cancel the changes:
   *  - clicks Edit
   *  - fills a temporary text
   *  - clicks Cancel (original text should remain).
   * @param {number} id - Task id to be edited.
   * @param {string} tempText - Temporary text used before canceling.
   */
  async cancelEditMobile(id: number, tempText: string) {
    await test.step(`Start mobile edit for task #${id}, type "${tempText}" and cancel`, async () => {
      await this.startEditMobile(id);
      await this.todoEditInputMobile(id).fill(tempText);
      await this.todoCancelButtonMobile(id).click();
    });
  }

  // ===== Complete Task =====

  /**
   * Mark a task as completed on desktop by clicking the "Complete" button.
   * @param {number} id - Task id to complete.
   */
  async completeTaskDesktop(id: number) {
    await test.step(`Complete desktop task #${id}`, async () => {
      await this.todoCompleteButtonDesktop(id).click();
    });
  }

  /**
   * Mark a task as completed on mobile by clicking the "Complete" button.
   * @param {number} id - Task id to complete.
   */
  async completeTaskMobile(id: number) {
    await test.step(`Complete mobile task #${id}`, async () => {
      await this.todoCompleteButtonMobile(id).click();
    });
  }

  // ===== Drag & Drop (Desktop) =====

  /**
   * Reorder tasks on desktop using drag and drop.
   *
   * @param {number} sourceId - The id of the task being dragged
   *   (this is the task you want to move).
   * @param {number} targetId - The id of the task that represents
   *   the drop target position (the task where the dragged item will be dropped).
   *
   * Example:
   *  dragTaskDesktop(3, 1)
   *  - Drag task with id 3
   *  - Drop it on top of task with id 1
   */
  async dragTaskDesktop(sourceId: number, targetId: number) {
    await test.step(`Drag desktop task #${sourceId} to position of task #${targetId}`, async () => {
      await this.todoItem(sourceId).dragTo(this.todoItem(targetId));
    });
  }
}
