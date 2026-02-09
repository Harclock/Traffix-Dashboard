import { ref } from 'vue'

export function useSettingsTabs() {
	const activeTab = ref('utente')

	const setTab = (tab) => {
		activeTab.value = tab
	}

	const isActive = (tab) => activeTab.value === tab

	return {
		activeTab,
		setTab,
		isActive
	}
}
