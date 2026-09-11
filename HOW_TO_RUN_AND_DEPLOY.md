# PetEmbro — Quick Editor & Deployment Guide

This guide explains how to run the editor on your computer/network, let someone edit, and publish the final website to **https://petembro.ca** in 3 simple steps.

---

## Step 1: Start the Local Server

Open your terminal in the project folder (`F:\AI\PetEmbro`) and run:

```bash
npm.cmd run dev
```
*(Or double-click `START_LOCAL_SERVER.bat` in this folder)*

### How to access the editor:
* **On your own computer**:
  `http://localhost:5173/customizer.html`
* **On another device on your home Wi-Fi** (phone, tablet, laptop):
  `http://<YOUR-LOCAL-IP>:5173/customizer.html`  *(e.g. `http://10.0.0.71:5173/customizer.html`)*

> **Need an instant shareable link?**
> In a second terminal, run:
> ```bash
> .\cloudflared.exe tunnel --url http://localhost:5173
> ```
> *(Or double-click `START_ONLINE_TUNNEL.bat`)*
> Copy the `https://...trycloudflare.com/customizer.html` link and send it to the person.

---

## Step 2: While the Person Is Editing

* When they edit text, upload photos, or change portfolio items in the visual customizer, **every change automatically saves directly to disk** on your computer (`src/data/siteContent.json`).
* You do not need to do anything while they work — just keep the server running.

---

## Step 3: Publish Changes to the Live Web (petembro.ca)

Once the person says they are finished:

1. **Stop the local server** (press `Ctrl + C` in the terminal).
2. **Build and deploy to the live site** with one command:
   ```bash
   npm.cmd run build
   npx.cmd gh-pages -d dist
   ```
   *(Or simply double-click `DEPLOY_TO_WEB.bat` in this folder)*

3. **Save changes to Git (optional but recommended)**:
   ```bash
   git add src/data/siteContent.json
   git commit -m "Update website content from visual customizer"
   git push origin main
   ```

Within 1 minute, the changes will be live for the entire world on **https://petembro.ca**!
