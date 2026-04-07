# The Logic Time-Machine - Extension VS Code

## 🎯 Description

**The Logic Time-Machine** est une extension révolutionnaire pour VS Code qui transforme votre façon de débugger. Au lieu d'utiliser des `console.log` ou des points d'arrêt, elle enregistre l'**ADN complet de chaque variable** pendant l'exécution de votre application.

### ✨ Fonctionnalités principales

- 🕰️ **Timeline interactive** : Visualisez l'historique complet de chaque variable
- 🔍 **Traçage automatique** : Capture toutes les modifications sans modifier votre code
- 🧠 **Analyse causale** : Remontez aux causes racines des bugs
- 📊 **Interface moderne** : WebView interactive avec graphiques temporels
- 💾 **Export/Import** : Partagez vos traces avec votre équipe
- ⚡ **Performance optimisée** : Impact minimal sur votre application

## 🚀 Installation

### Depuis le Marketplace VS Code
1. Ouvrir VS Code
2. Aller dans Extensions (Ctrl+Shift+X)
3. Rechercher "Logic Time-Machine"
4. Cliquer sur "Install"

### Installation manuelle (.vsix)
1. Télécharger le fichier `logic-time-machine-1.0.0.vsix`
2. Dans VS Code : `Ctrl+Shift+P` → "Extensions: Install from VSIX"
3. Sélectionner le fichier téléchargé

## 📖 Utilisation

### 1. Démarrer l'enregistrement
- Ouvrir la vue "Variable History" dans l'explorateur
- Cliquer sur ▶️ "Démarrer l'enregistrement"
- Ou utiliser `Ctrl+Shift+P` → "Time-Machine: Démarrer l'enregistrement"

### 2. Analyser une variable
- Sélectionner une variable dans votre code
- Clic droit → "🕰️ Afficher la timeline"
- Ou utiliser `Ctrl+Shift+P` → "Time-Machine: Afficher la timeline"

### 3. Explorer l'historique
- La timeline interactive s'ouvre dans un panneau latéral
- Cliquez sur chaque changement pour naviguer vers le code source
- Explorez la call stack pour comprendre le contexte

## ⚙️ Configuration

```json
{
  "logicTimeMachine.maxChanges": 10000,
  "logicTimeMachine.maxMemoryMB": 50,
  "logicTimeMachine.recordingDurationMinutes": 10,
  "logicTimeMachine.ignoredVariables": ["requestId", "timestamp", "_id"]
}
```

## 🎬 Exemple d'utilisation

```javascript
// Votre code JavaScript/TypeScript
let user = { email: null, name: "John" };

function login(credentials) {
    fetch('/api/login', { method: 'POST', body: credentials })
        .then(response => {
            if (response.ok) {
                user.email = credentials.email; // ← Tracé automatiquement
            } else {
                user.email = null; // ← Cause racine identifiée
            }
        });
}

// Sélectionnez 'user.email' → Timeline montre :
// 1. Initialisation à null (ligne 2)
// 2. Tentative de login (ligne 6)  
// 3. Échec API → retour à null (ligne 9)
```

## 🔧 Développement

### Prérequis
- Node.js 16+
- VS Code 1.74+

### Build local
```bash
npm install
npm run compile
```

### Test
```bash
code --install-extension logic-time-machine-1.0.0.vsix
```

## 📦 Publication

### Générer le VSIX
```bash
npm install -g vsce
vsce package
```

### Publier sur le Marketplace
```bash
vsce publish
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour les détails.

## 📄 Licence

MIT © Barack Ndenga

## 🙏 Remerciements

Développé avec ❤️ par **Barack Ndenga**

---

**🚀 Révolutionnez votre debugging avec The Logic Time-Machine !**