export async function createTask(listId: string, taskTitle: string) {
  try {
    const res = await fetch('/api/task/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listId, taskTitle }),
    });

    return res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function updateTaskStatus(taskId: string, isComplete: boolean) {
  try {
    const res = await fetch('/api/task/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: taskId,
        isComplete,
      }),
    });
    return res.status;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteTask(taskId: string) {
  try {
    const res = await fetch('/api/task/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: taskId,
      }),
    });
    return res.status;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
