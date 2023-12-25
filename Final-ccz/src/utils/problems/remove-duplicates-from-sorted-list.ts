import assert from "assert";
import { Problem } from "../types/problem";
import example1 from "./images/remove-node.jpeg";
import example2 from "./images/remove-node2.jpeg";


// JS doesn't have a built in LinkedList class, so we'll create one
class LinkedList {
	value: number;
	next: LinkedList | null;

	constructor(value: number) {
		this.value = value;
		this.next = null;
	}

	removeDuplicates(head: LinkedList): LinkedList {
           // Special case...
			if (head == null || head.next == null)
			return head;
			// create a fake node that acts like a fake head of list pointing to the original head and it points to the original head......
			var fake = new LinkedList(0);
			fake.next = head;
			var curr = fake;
			// Loop till curr.next and curr.next.next not null
			while(curr.next != null && curr.next.next != null){         // curr.next means the next node of curr pointer and curr.next.next means the next of next of curr pointer...
				// if the value of curr.next and curr.next.next is same...
				// There is a duplicate value present in the list...
				if(curr.next.value == curr.next.next.value) {
					let duplicate = curr.next.value;
					// If the next node of curr is not null and its value is eual to the duplicate value...
					while(curr.next !=null && curr.next.value == duplicate) {
						// Skip those element and keep updating curr...
						curr.next = curr.next.next;
					}
				}
				// Otherwise, move curr forward...
				else{
					curr = curr.next;
				}
			}
			return fake.next;    
	}
}

export const removeDuplicatesLinkedListHandler = (fn: any) => {
	try {
		const tests = [[1,2,3,3,4,4,5], [1,1,1,2,3], [1, 3, 3]];
		const answers = [[1,2,5], [2,3], [1]];
		for (let i = 0; i < tests.length; i++) {
			const list = createLinkedList(tests[i]);
			const result = fn(list);
			assert.deepEqual(getListValues(result), answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("Error from removedDuplicatesLinkedListHandler: ", error);
		throw new Error(error);
	}
};

// it creates a linked list from an array
function createLinkedList(values: number[]): LinkedList {
	const head = new LinkedList(values[0]);
	let current = head;
	for (let i = 1; i < values.length; i++) {
		const node = new LinkedList(values[i]);
		current.next = node;
		current = node;
	}
	return head;
}

// it returns an array of values from a linked list
function getListValues(head: LinkedList): number[] {
	const values = [];
	let current: LinkedList | null = head;
	while (current !== null) {
		values.push(current.value);
		current = current.next;
	}
	return values;
}

const starterCodeRemoveDuplicatesLinkedListJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    
};`;

export const removeDuplicatesLinkedList: Problem = {
	id: "remove-duplicates-from-sorted-list",
	title: "6. Remove duplicates from sorted list",
	problemStatement: `<p class='mt-3'>Given the <code>head</code> of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list <em>sorted</em> as well.</p>
	`,
	examples: [
		{
			id: 0,
			inputText: "head = [1,2,3,3,4,4,5]",
			outputText: "[1,2,5]",
			img: example1.src,
		},
		{
			id: 1,
			inputText: "head = [1,1,1,2,3]",
			outputText: "[2,3]",
			img: example2.src,
		}
	],
	constraints: `<li class='mt-2'>The number of nodes in the list is in the range <code>[0, 300]</code>.</li>
	<li class='mt-2'><code>-100 <= Node.val <= 100</code></li>
<li class='mt-2'>The list is guaranteed to be <em>sorted</em> in ascending order.</li>`,
	starterCode: starterCodeRemoveDuplicatesLinkedListJS,
	handlerFunction: removeDuplicatesLinkedListHandler,
	starterFunctionName: "function deleteDuplicates(",
	order: 6,
	languageSupports: [
		{title :'js', 
		starterCode: `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var deleteDuplicates = function(head) {
	
};	
		`
	}, {title: 'python', starterCode: `""""
	   * Definition for singly-linked list.
	   * function ListNode(val, next) {
	   *     this.val = (val===undefined ? 0 : val)
	   *     this.next = (next===undefined ? null : next)
	   * }
	  """
	  """"
	   * @param {ListNode} head
	   * @return {ListNode}
	  """
	  var deleteDuplicates = def(head):
		  pass`}, 
		{title: 'java', starterCode: `/*
		* Definition for singly-linked list.
		* public class ListNode {
		*     int val;
		*     ListNode next;
		*     ListNode(int x) { val = x; }
		* }
		*/
	   
	   public ListNode deleteDuplicates(ListNode head) {
		   //pass
	   }`}]
};
