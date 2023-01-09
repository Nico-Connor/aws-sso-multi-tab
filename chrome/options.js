// Saves options to chrome.storage
const updateAccounts = (accounts) => {
    document.getElementById('account-list').textContent = JSON.stringify(accounts, null, 1);
}

const saveOptions = () => {
    const accounts = document.getElementById('accounts').value;

    const accountList = accounts.split('\n').map(account => account.split(','));

    chrome.storage.sync.set({
        accounts: accountList
    }, () => {
        updateAccounts(accountList);
    });
}

const restoreOptions = () => {
    chrome.storage.sync.get({
        accounts: []
    }, (items) => {
        document.getElementById('accounts').value = items.accounts.map(item => item.join(',')).join('\n');

        updateAccounts(items.accounts);
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);