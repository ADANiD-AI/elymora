{{/*
Expand the name of the chart.
*/}}
{{- define "adanid.fullname" -}}
{{- .Release.Name }}-{{ .Chart.Name }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "adanid.labels" -}}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
