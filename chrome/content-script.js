(() => {
    'use strict';
    const str = document.querySelector("[title^='AWSReservedSSO']").title;
    const re = /\w+_(\w+)_(\w+)\/(.*)\s+@\s+(.+)/;
    const results = re.exec(str);
    const role = results[1];
    const username = results[3].replace(/@.*$/, '');
    const account = results[4];

    document.querySelector("[title^='AWSReservedSSO']").textContent = `${account} / ${role} / ${username}`;

    document.querySelector("[title^='AWSReservedSSO']").style.padding = '4px';

    if (account.endsWith('integration' || account.endsWith('sandbox'))) {
        document.querySelector("[title^='AWSReservedSSO']").style.backgroundColor = 'green';
    } else if (account.endsWith('staging')) {
        document.querySelector("[title^='AWSReservedSSO']").style.backgroundColor = 'darkorange';
    } else {
        document.querySelector("[title^='AWSReservedSSO']").style.backgroundColor = 'red';
    }
})();
