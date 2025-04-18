# Cube Scrambler MCP Server
[Cube Scrambler](https://github.com/miso-develop/cube-scrambler)を制御するMCPサーバーです。

## できること
* キューブをランダムにスクランブルする
* キューブをランダムなPLL状態にする
* キューブをランダムなOLL状態にする
* キューブを指定のステップのランダムな状態にする
* キューブを指定のシーケンスに沿って操作する

## Config

### Claude Desktop

```json
{
    "mcpServers": {
        "cube-scrambler": {
            "command": "npx",
            "args": [
                "-y",
                "https://github.com/miso-develop/cube-scrambler-mcp"
            ],
            "env": {
                "BASE_URL": "http://localhost:8080"
            }
        }
    }
}
```
