#!/usr/bin/env node
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

const BASE_URL = process.env.BASE_URL || "http://localhost:3001"

const server = new McpServer({
	name: "Cube Scrambler MCP",
	version: "0.0.1"
})



server.tool(
	"scramble-random",
	"ソルブ済みのルービックキューブをCube Scramblerにてランダムにスクランブルする",
	async () => {
		const endpoint = `${BASE_URL}/api/scramble?type=0`
		const response = await fetch(endpoint)
		const result = await response.json()
		return { content: [{ type: "text", text: JSON.stringify(result) }] }
	}
)

server.tool(
	"step",
	"ソルブ済みのルービックキューブをCube Scramblerにて指定のステップ状態にする",
	{ number: z.number().min(2).max(7) },
	async ({ number }) => {
		const endpoint = `${BASE_URL}/api/step?number=${number}`
		const response = await fetch(endpoint)
		const result = await response.json()
		return { content: [{ type: "text", text: JSON.stringify(result) }] }
	}
)

server.tool(
	"step-pll",
	"ソルブ済みのルービックキューブをCube ScramblerにてランダムなPLLの状態にする",
	async () => {
		const number = 6
		const endpoint = `${BASE_URL}/api/step?number=${number}`
		const response = await fetch(endpoint)
		const result = await response.json()
		return { content: [{ type: "text", text: JSON.stringify(result) }] }
	}
)

server.tool(
	"step-oll",
	"ソルブ済みのルービックキューブをCube ScramblerにてランダムなOLLの状態にする",
	async () => {
		const number = 4
		const endpoint = `${BASE_URL}/api/step?number=${number}`
		const response = await fetch(endpoint)
		const result = await response.json()
		return { content: [{ type: "text", text: JSON.stringify(result) }] }
	}
)

server.tool(
	"sequence",
	"ルービックキューブをCube Scramblerにて指定のシーケンスに沿って動かす",
	{ sequence: z.string().regex(new RegExp(/^[LRUDFB]['2]?(\s[LRUDFB]['2]?)*$/)) },
	async ({ sequence }) => {
		const endpoint = `${BASE_URL}/api/sequence?sequence=${sequence}`
		const response = await fetch(endpoint)
		const result = await response.json()
		return { content: [{ type: "text", text: JSON.stringify(result) }] }
	}
)



const transport = new StdioServerTransport()
await server.connect(transport)
console.log("start!")
