"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, Loader2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Header from "./../header"

export default function JobSeekerProfilePage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedResume, setUploadedResume] = useState<{
    id: string
    filename: string
    uploadedAt: string
    size: string
  } | null>(null)
  
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      const validExtensions = ['.pdf', '.doc', '.docx']
      const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase()
      
      if (!validTypes.includes(selectedFile.type) && !validExtensions.includes(fileExtension)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or DOC/DOCX file",
          variant: "destructive",
        })
        return
      }

      // Validate file size (5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        })
        return
      }
      setFile(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a resume to upload",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append("resume", file)

      const response = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Upload failed")
      }

      // Format file size
      const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B"
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
        return (bytes / (1024 * 1024)).toFixed(2) + " MB"
      }

      setUploadedResume({
        id: data.resumeId,
        filename: file.name,
        uploadedAt: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        size: formatFileSize(file.size),
      })

      toast({
        title: "Success!",
        description: data.message || "Resume uploaded successfully",
      })

      setFile(null)
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleReplace = () => {
    setUploadedResume(null)
    setFile(null)
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 max-w-4xl space-y-6">
        {/* Profile Header */}
        <div>
          <h2 className="text-3xl font-bold text-foreground">Your Profile</h2>
          <p className="text-muted-foreground mt-1">Manage your profile and improve your ATS score</p>
        </div>

        {/* Resume Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Resume
            </CardTitle>
            <CardDescription>Upload your resume for ATS analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!uploadedResume ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label
                  htmlFor="resume-upload"
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer block"
                >
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={uploading}
                  />
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm font-medium text-foreground mb-1">
                    Drop your resume here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports PDF, DOC, DOCX (Max 5MB)
                  </p>
                </label>

                {file && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-accent/20">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={handleRemoveFile}
                        disabled={uploading}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        disabled={uploading}
                        className="flex-1"
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Resume
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        onClick={handleRemoveFile}
                        variant="outline"
                        disabled={uploading}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            ) : (
              <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-accent/20">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {uploadedResume.filename}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Uploaded {uploadedResume.uploadedAt} • {uploadedResume.size}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleReplace}>
                    Replace
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}