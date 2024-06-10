type TodoItem = {
    title: string;
    id: number;
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