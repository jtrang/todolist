export async function getAllLists() {
  try {
    const res = await fetch('/api/lists');
    return res.json();
  } catch (err) {
    // TODO handle error
    console.log(err);
  }
}

export async function createList(listTitle: string) {
  /**
   * TODO: fail fast! Guard against missing list title
   */
  console.log('== inside here ==');
  try {
    const res = await fetch('/api/list/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listTitle }),
    });

    return res.json();
  } catch (err) {
    // TODO handle error
    console.log(err);
    throw err;
  }
}

export async function deleteList(listId: string) {
  try {
    const res = await fetch('/api/list/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listId }),
    });

    return res.status;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
