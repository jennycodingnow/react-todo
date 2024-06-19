type TodoItem = {
    id: number;
    title: string;
};

//what I send to airtable to create a TODO
type TodoItemRequest = {
	fields: {
    title: string;
	};
};

//what I get back from airtable
type TodoItemResponse = {
	records: TodoRecord[];
};

type TodoRecord = {
	fields: {
		title: string;
	};
	id: number;
};