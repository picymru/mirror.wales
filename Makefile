NAME := worker-mirrors

.PHONY: deploy
deploy:
	curl -X PUT "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ORG_ID}/workers/scripts/${NAME}" -H "X-Auth-Email:${CLOUDFLARE_EMAIL}" -H "X-Auth-Key:${CLOUDFLARE_KEY}" -F 'script=@worker.js;type=application/javascript' -F 'metadata={"body_part": "script", "bindings": [{"name": "mirrors", "type": "kv_namespace", "namespace_id": "${CLOUDFLARE_KV_NAMESPACEID}"}]};type=application/json'

.PHONY: deploy-mirrors
deploy-mirrors:
	curl "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ORG_ID}/storage/kv/namespaces/${CLOUDFLARE_KV_NAMESPACEID}/values/mirrors" -X PUT -H "X-Auth-Email:${CLOUDFLARE_EMAIL}" -H "X-Auth-Key:${CLOUDFLARE_KEY}" --data @mirrors.json