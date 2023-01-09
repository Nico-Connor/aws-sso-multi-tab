document.querySelector('#open-options').addEventListener('click', () => {
    window.open(chrome.runtime.getURL('options.html'));
});

function loadAccounts() {
    chrome.storage.sync.get({
        accounts: []
    }, async (items) => {
        items.accounts.forEach(item => {
            const listItem = document.createElement('li');
            listItem.setAttribute('style', 'margin-bottom: 2px; width: 100%; list-style-type: none;');
            if (item[0].trim().length === 0) {
                listItem.appendChild(document.createElement('hr'));

                document.querySelector('#account-list').appendChild(listItem);
                return;
            }
            const button = document.createElement('button');
            button.setAttribute('class', 'account-button');
            button.setAttribute('style', `color: ${item[2]};`);
            button.id = item[0];
            button.innerText = item[0];

            listItem.appendChild(button);

            document.querySelector('#account-list').appendChild(listItem);

            button.addEventListener('click', async () => {
                document.querySelector('#account-list').replaceChildren();

                const pleaseWait = document.createElement('li');
                pleaseWait.innerText = `Redirecting you to ${item[0]}. Page will reload automatically. Do not close this popup.`;

                document.querySelector('#account-list').appendChild(pleaseWait);

                const [currentTab] = await chrome.tabs.query({ active: true });

                // if it's a new tab, don't bother opening in a new tab.
                if (currentTab.url.includes('chrome://newtab')) {
                    await chrome.tabs.update(currentTab.id, {
                        url: item[1]
                    });

                    window.close();

                    return;
                }

                let tab = await chrome.tabs.create({
                    url: item[1],
                    active: !currentTab.url.includes('console.aws.amazon.com') // switch immediately if we're not on an AWS page.
                });

                let refreshCount = 0;

                const refreshId = setInterval(async () => {
                    refreshCount++;

                    tab = await chrome.tabs.get(tab.id);

                    if (tab.url && tab.url.includes('console.aws.amazon.com')) {
                        await chrome.tabs.remove(tab.id);

                        clearInterval(refreshId);
                        await chrome.tabs.reload();
                        window.close();
                    }

                    if (refreshCount > 50) {
                        clearInterval(refreshId);

                        pleaseWait.innerText = 'Something\'s not quite right. Check the tab, then come back here and try again.';
                        const checkTabButton = document.createElement('button');
                        checkTabButton.setAttribute('class', 'check-tab-button');
                        checkTabButton.innerText = 'Check Tab';
                        checkTabButton.addEventListener('click', async () => {
                            await chrome.tabs.update(tab.id, { selected: true });
                        });
                        pleaseWait.appendChild(checkTabButton);
                    }
                }, 500);
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', loadAccounts);