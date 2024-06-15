type TodoItem = {
    id: number;
    title: string;
};

type TodoItemRequest = {
    //what I send to airtable to create a TODO
    title: string;
}

type TodoItemResponse = {
    //what I get back from airtable
    title: string;
    id: number;
}