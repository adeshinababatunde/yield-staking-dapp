#react 



How to pass a parameter to an event handler or callback!



You can use an arrow function to wrap around an event handler and pass parameters:



<button onClick={() => this.clickButton(id)} />



This is an equivalent to calling .bind:


<button onClick={this.clickButton.bind(this, id)} />



Apart from these two approaches, you can also pass arguments to a function which is defined as arrow function



<button onClick={this.clickButton(id)} />;

clickButton = (id) => () => {

  console.log('Hello, your ticket number is', id);

};

