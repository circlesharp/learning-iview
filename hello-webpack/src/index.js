import printMe from './print';

async function getComponent() {
	const { default: _ } = await import('lodash');

	const element = document.createElement('div');
	const btn = document.createElement('button');

	element.innerHTML = _.join(['Hello', 'webpack'], ' ');

	btn.innerHTML = 'Click me and check the console!';
	btn.onclick = printMe;
	element.appendChild(btn);

	return element;
}

getComponent().then(component => {
	document.body.appendChild(component);
});
