(()=>{var __webpack_modules__={138:()=>{eval("let account\n\nconst initializeMina = async () => {\n  const onboardButton = document.getElementById('connectButton')\n  const getAccountsButton = document.getElementById('getAccounts')\n  const getAccountsResults = document.getElementById('getAccountsResult')\n\n  onboardButton.onclick = async () => {\n    if (!window.mina) {\n      alert(\"No provider was found 请先安装 auro-wallet\")\n    } else {\n      onboardButton.innerText = 'Onboarding in progress'\n      let data = await window.mina.requestAccounts().catch(err=>err)\n      if(data.result){\n        let approveAccount = data.result\n        // if (Array.isArray(approveAccount) && approveAccount.length > 0) {\n          account = approveAccount\n          document.getElementById('accounts').innerHTML = approveAccount;\n          onboardButton.innerText = 'Connected'\n          onboardButton.disabled = true\n        // } \n      }else{\n        onboardButton.innerText = data.error.message\n      }\n    }\n  }\n  /**\n   * get account\n   */\n  getAccountsButton.onclick = async () => {\n    if (window.mina) {\n      let data = await window.mina.requestAccounts().catch(err=>err)\n      let approveAccount = data.result\n      if(approveAccount){\n        getAccountsResults.innerHTML = approveAccount;\n      }else{\n        getAccountsResults.innerHTML = data.error.message\n      }\n    }\n  }\n\n\n  const sendButton = document.getElementById('sendButton')\n  const sendAmountInput = document.getElementById('sendAmountInput')\n  const receiveAddressInput = document.getElementById('receiveAddressInput')\n  const sendResultDisplay = document.getElementById('sendResultDisplay')\n\n  /**\n   * transfer \n   */\n  sendButton.onclick = async () => {\n    let from = account && account.length > 0 ? account[0] : \"\"\n    let sendResult = await window.mina.signTransfer({\n      amount: sendAmountInput.value,\n      from: from,\n      to: receiveAddressInput.value,\n    }).catch(err=>err)\n    if(sendResult.result){\n      sendResultDisplay.innerHTML = sendResult.result.hash\n    }else{\n      sendResultDisplay.innerHTML = sendResult.error.message\n    }\n  }\n\n\n  /**\n   * staking\n   */\n  const stakingButton = document.getElementById('stakingButton')\n  const vaildatorAddressInput = document.getElementById('vaildatorAddressInput')\n  const stakingResultDisplay = document.getElementById('stakingResultDisplay')\n\n  stakingButton.onclick = async () => {//质押不用输入金额\n    let from = account && account.length > 0 ? account[0] : \"\"\n    let stakingResult = await window.mina.signStaking({\n      from: from,\n      to: vaildatorAddressInput.value,\n    }).catch(err=>err)\n    console.log('dapp-staking--0', stakingResult)\n    if(stakingResult.result){\n      stakingResultDisplay.innerHTML = stakingResult.result.hash\n    }else{\n      stakingResultDisplay.innerHTML = stakingResult.error.message\n    }\n  }\n  /**\n   * sign message\n   */\n  const signMessageButton = document.getElementById('signMessageButton')\n  const signMessageContent = document.getElementById('signMessageContent')\n  const signMessageResult = document.getElementById('signMessageResult')\n  const signVerifyButton = document.getElementById('signVerifyButton')\n  const verifyResult = document.getElementById('verifyResult')\n\n\n  let signResult\n\n  signMessageButton.onclick = async () => {\n    let from = account && account.length > 0 ? account[0] : \"\"\n    signResult = await window.mina.signMessage({\n      from: from,\n      message: signMessageContent.value,\n    }).catch(err=>err)\n    if(signResult.result){\n      signMessageResult.innerHTML = signResult.result.signature\n    }else{\n      signMessageResult.innerHTML = signResult.error.message\n    }\n  }\n\n  /**\n   * Verify Message\n   */\n  signVerifyButton.onclick = async () => {\n    let messageVerifyResult = await window.mina.verifyMessage({\n      message: signResult.result?.signature,\n    }).catch(err=>err)\n    if(messageVerifyResult.result){\n      verifyResult.innerHTML = messageVerifyResult.result\n    }else{\n      verifyResult.innerHTML = messageVerifyResult.error.message\n    }\n  }\n\n\n  setTimeout(() => {\n    if (window.mina) {\n      window.mina.onAccountChange(handleNewAccounts);\n    }\n  }, 200);\n\n  function handleNewAccounts(newAccounts) {\n    console.log('handleNewAccounts==0',newAccounts)\n    if (Array.isArray(newAccounts)) {\n      document.getElementById('accounts').innerHTML = newAccounts;\n      if (newAccounts.length === 0) {\n        onboardButton.innerText = 'Connect'\n        onboardButton.disabled = false\n      }\n    }\n  }\n}\nwindow.addEventListener('DOMContentLoaded', initializeMina)//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wbGF5Z3JvdW5kLy4vc3JjL2luZGV4LmpzP2I2MzUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFk7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiMTM4LmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGFjY291bnRcblxuY29uc3QgaW5pdGlhbGl6ZU1pbmEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IG9uYm9hcmRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ubmVjdEJ1dHRvbicpXG4gIGNvbnN0IGdldEFjY291bnRzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dldEFjY291bnRzJylcbiAgY29uc3QgZ2V0QWNjb3VudHNSZXN1bHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dldEFjY291bnRzUmVzdWx0JylcblxuICBvbmJvYXJkQnV0dG9uLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCF3aW5kb3cubWluYSkge1xuICAgICAgYWxlcnQoXCJObyBwcm92aWRlciB3YXMgZm91bmQg6K+35YWI5a6J6KOFIGF1cm8td2FsbGV0XCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIG9uYm9hcmRCdXR0b24uaW5uZXJUZXh0ID0gJ09uYm9hcmRpbmcgaW4gcHJvZ3Jlc3MnXG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHdpbmRvdy5taW5hLnJlcXVlc3RBY2NvdW50cygpLmNhdGNoKGVycj0+ZXJyKVxuICAgICAgaWYoZGF0YS5yZXN1bHQpe1xuICAgICAgICBsZXQgYXBwcm92ZUFjY291bnQgPSBkYXRhLnJlc3VsdFxuICAgICAgICAvLyBpZiAoQXJyYXkuaXNBcnJheShhcHByb3ZlQWNjb3VudCkgJiYgYXBwcm92ZUFjY291bnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGFjY291bnQgPSBhcHByb3ZlQWNjb3VudFxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhY2NvdW50cycpLmlubmVySFRNTCA9IGFwcHJvdmVBY2NvdW50O1xuICAgICAgICAgIG9uYm9hcmRCdXR0b24uaW5uZXJUZXh0ID0gJ0Nvbm5lY3RlZCdcbiAgICAgICAgICBvbmJvYXJkQnV0dG9uLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICAvLyB9IFxuICAgICAgfWVsc2V7XG4gICAgICAgIG9uYm9hcmRCdXR0b24uaW5uZXJUZXh0ID0gZGF0YS5lcnJvci5tZXNzYWdlXG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBnZXQgYWNjb3VudFxuICAgKi9cbiAgZ2V0QWNjb3VudHNCdXR0b24ub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAod2luZG93Lm1pbmEpIHtcbiAgICAgIGxldCBkYXRhID0gYXdhaXQgd2luZG93Lm1pbmEucmVxdWVzdEFjY291bnRzKCkuY2F0Y2goZXJyPT5lcnIpXG4gICAgICBsZXQgYXBwcm92ZUFjY291bnQgPSBkYXRhLnJlc3VsdFxuICAgICAgaWYoYXBwcm92ZUFjY291bnQpe1xuICAgICAgICBnZXRBY2NvdW50c1Jlc3VsdHMuaW5uZXJIVE1MID0gYXBwcm92ZUFjY291bnQ7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgZ2V0QWNjb3VudHNSZXN1bHRzLmlubmVySFRNTCA9IGRhdGEuZXJyb3IubWVzc2FnZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgY29uc3Qgc2VuZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZW5kQnV0dG9uJylcbiAgY29uc3Qgc2VuZEFtb3VudElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbmRBbW91bnRJbnB1dCcpXG4gIGNvbnN0IHJlY2VpdmVBZGRyZXNzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVjZWl2ZUFkZHJlc3NJbnB1dCcpXG4gIGNvbnN0IHNlbmRSZXN1bHREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbmRSZXN1bHREaXNwbGF5JylcblxuICAvKipcbiAgICogdHJhbnNmZXIgXG4gICAqL1xuICBzZW5kQnV0dG9uLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGZyb20gPSBhY2NvdW50ICYmIGFjY291bnQubGVuZ3RoID4gMCA/IGFjY291bnRbMF0gOiBcIlwiXG4gICAgbGV0IHNlbmRSZXN1bHQgPSBhd2FpdCB3aW5kb3cubWluYS5zaWduVHJhbnNmZXIoe1xuICAgICAgYW1vdW50OiBzZW5kQW1vdW50SW5wdXQudmFsdWUsXG4gICAgICBmcm9tOiBmcm9tLFxuICAgICAgdG86IHJlY2VpdmVBZGRyZXNzSW5wdXQudmFsdWUsXG4gICAgfSkuY2F0Y2goZXJyPT5lcnIpXG4gICAgaWYoc2VuZFJlc3VsdC5yZXN1bHQpe1xuICAgICAgc2VuZFJlc3VsdERpc3BsYXkuaW5uZXJIVE1MID0gc2VuZFJlc3VsdC5yZXN1bHQuaGFzaFxuICAgIH1lbHNle1xuICAgICAgc2VuZFJlc3VsdERpc3BsYXkuaW5uZXJIVE1MID0gc2VuZFJlc3VsdC5lcnJvci5tZXNzYWdlXG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogc3Rha2luZ1xuICAgKi9cbiAgY29uc3Qgc3Rha2luZ0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFraW5nQnV0dG9uJylcbiAgY29uc3QgdmFpbGRhdG9yQWRkcmVzc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZhaWxkYXRvckFkZHJlc3NJbnB1dCcpXG4gIGNvbnN0IHN0YWtpbmdSZXN1bHREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YWtpbmdSZXN1bHREaXNwbGF5JylcblxuICBzdGFraW5nQnV0dG9uLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7Ly/otKjmirzkuI3nlKjovpPlhaXph5Hpop1cbiAgICBsZXQgZnJvbSA9IGFjY291bnQgJiYgYWNjb3VudC5sZW5ndGggPiAwID8gYWNjb3VudFswXSA6IFwiXCJcbiAgICBsZXQgc3Rha2luZ1Jlc3VsdCA9IGF3YWl0IHdpbmRvdy5taW5hLnNpZ25TdGFraW5nKHtcbiAgICAgIGZyb206IGZyb20sXG4gICAgICB0bzogdmFpbGRhdG9yQWRkcmVzc0lucHV0LnZhbHVlLFxuICAgIH0pLmNhdGNoKGVycj0+ZXJyKVxuICAgIGNvbnNvbGUubG9nKCdkYXBwLXN0YWtpbmctLTAnLCBzdGFraW5nUmVzdWx0KVxuICAgIGlmKHN0YWtpbmdSZXN1bHQucmVzdWx0KXtcbiAgICAgIHN0YWtpbmdSZXN1bHREaXNwbGF5LmlubmVySFRNTCA9IHN0YWtpbmdSZXN1bHQucmVzdWx0Lmhhc2hcbiAgICB9ZWxzZXtcbiAgICAgIHN0YWtpbmdSZXN1bHREaXNwbGF5LmlubmVySFRNTCA9IHN0YWtpbmdSZXN1bHQuZXJyb3IubWVzc2FnZVxuICAgIH1cbiAgfVxuICAvKipcbiAgICogc2lnbiBtZXNzYWdlXG4gICAqL1xuICBjb25zdCBzaWduTWVzc2FnZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduTWVzc2FnZUJ1dHRvbicpXG4gIGNvbnN0IHNpZ25NZXNzYWdlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduTWVzc2FnZUNvbnRlbnQnKVxuICBjb25zdCBzaWduTWVzc2FnZVJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduTWVzc2FnZVJlc3VsdCcpXG4gIGNvbnN0IHNpZ25WZXJpZnlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnblZlcmlmeUJ1dHRvbicpXG4gIGNvbnN0IHZlcmlmeVJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2ZXJpZnlSZXN1bHQnKVxuXG5cbiAgbGV0IHNpZ25SZXN1bHRcblxuICBzaWduTWVzc2FnZUJ1dHRvbi5vbmNsaWNrID0gYXN5bmMgKCkgPT4ge1xuICAgIGxldCBmcm9tID0gYWNjb3VudCAmJiBhY2NvdW50Lmxlbmd0aCA+IDAgPyBhY2NvdW50WzBdIDogXCJcIlxuICAgIHNpZ25SZXN1bHQgPSBhd2FpdCB3aW5kb3cubWluYS5zaWduTWVzc2FnZSh7XG4gICAgICBmcm9tOiBmcm9tLFxuICAgICAgbWVzc2FnZTogc2lnbk1lc3NhZ2VDb250ZW50LnZhbHVlLFxuICAgIH0pLmNhdGNoKGVycj0+ZXJyKVxuICAgIGlmKHNpZ25SZXN1bHQucmVzdWx0KXtcbiAgICAgIHNpZ25NZXNzYWdlUmVzdWx0LmlubmVySFRNTCA9IHNpZ25SZXN1bHQucmVzdWx0LnNpZ25hdHVyZVxuICAgIH1lbHNle1xuICAgICAgc2lnbk1lc3NhZ2VSZXN1bHQuaW5uZXJIVE1MID0gc2lnblJlc3VsdC5lcnJvci5tZXNzYWdlXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmeSBNZXNzYWdlXG4gICAqL1xuICBzaWduVmVyaWZ5QnV0dG9uLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgbGV0IG1lc3NhZ2VWZXJpZnlSZXN1bHQgPSBhd2FpdCB3aW5kb3cubWluYS52ZXJpZnlNZXNzYWdlKHtcbiAgICAgIG1lc3NhZ2U6IHNpZ25SZXN1bHQucmVzdWx0Py5zaWduYXR1cmUsXG4gICAgfSkuY2F0Y2goZXJyPT5lcnIpXG4gICAgaWYobWVzc2FnZVZlcmlmeVJlc3VsdC5yZXN1bHQpe1xuICAgICAgdmVyaWZ5UmVzdWx0LmlubmVySFRNTCA9IG1lc3NhZ2VWZXJpZnlSZXN1bHQucmVzdWx0XG4gICAgfWVsc2V7XG4gICAgICB2ZXJpZnlSZXN1bHQuaW5uZXJIVE1MID0gbWVzc2FnZVZlcmlmeVJlc3VsdC5lcnJvci5tZXNzYWdlXG4gICAgfVxuICB9XG5cblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZiAod2luZG93Lm1pbmEpIHtcbiAgICAgIHdpbmRvdy5taW5hLm9uQWNjb3VudENoYW5nZShoYW5kbGVOZXdBY2NvdW50cyk7XG4gICAgfVxuICB9LCAyMDApO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZU5ld0FjY291bnRzKG5ld0FjY291bnRzKSB7XG4gICAgY29uc29sZS5sb2coJ2hhbmRsZU5ld0FjY291bnRzPT0wJyxuZXdBY2NvdW50cylcbiAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdBY2NvdW50cykpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhY2NvdW50cycpLmlubmVySFRNTCA9IG5ld0FjY291bnRzO1xuICAgICAgaWYgKG5ld0FjY291bnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBvbmJvYXJkQnV0dG9uLmlubmVyVGV4dCA9ICdDb25uZWN0J1xuICAgICAgICBvbmJvYXJkQnV0dG9uLmRpc2FibGVkID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdGlhbGl6ZU1pbmEpIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///138\n")}},__webpack_exports__={};__webpack_modules__[138](),window.playground=__webpack_exports__.playground})();